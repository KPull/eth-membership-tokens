pragma solidity ^0.4.18;

import "./owned.sol";
import "./ExpiringMembership.sol";
import "./ApplicationSource.sol";
import "./Application.sol";

/**
 * This contract connects to an ExpiringMembership contract and allows the purchase
 * of membership tokens using Ether
 */
contract EthApplicationRegistrar is ApplicationSource, owned {

    event PriceChanged(address owner, uint oldPrice, uint newPrice);
    event DurationChanged(address owner, uint oldDuration, uint newDuration);
    event MembershipRequested(address member, uint price);
    event MembershipPurchased(address member, uint price, uint duration, uint expiry);
    event MembershipRejected(address member, uint refunded);
    event MembershipRequestWithdrawn(address member, uint refunded);
    event FundsWithdrawn(address account, uint amount, uint balance);

    /**
     * The address where we are purchasing membership tokens at
     */
    ExpiringMembership public membershipContract;

    /**
     * The price for purchasing membership using this contract
     */
    uint public price;

    /**
     * The length of time membership, purchased with this contract, will last
     */
    uint public duration;

    /**
     * Address for the contract which managing applications
     */
    Application public applications;

    /**
     * Eschrowed balances in wei
     */
    mapping(address => uint) public escrow;

    /**
     * The withdrawable balances for various addresses in wei
     */
    mapping(address => uint) public balance;

    modifier byApplicationsContract() {
        assert(msg.sender == address(applications));
        _;
    }

    function EthApplicationRegistrar(ExpiringMembership _membershipContract, Application _applications, uint _price, uint _duration) {
        owner = msg.sender;
        membershipContract = _membershipContract;
        applications = _applications;
        price = _price;
        duration = _duration;
    }

    function changePrice(uint _price) byOwner {
        PriceChanged(msg.sender, price, _price);
        price = _price;
    }

    function changeDuration(uint _duration) byOwner {
        DurationChanged(msg.sender, duration, _duration);
        duration = _duration;
    }

    /**
     * Purchase a single membership token using Ether. The funds will be placed in escrow first and an application is opened.
     * The application will be opened if the message contains the amount of Ether indicated by the price, another application is not already
     * open and any one of the following:
     * 1. The message sender (or payer) is not a member of the organisation already.
     * 2. The message sender is a member of the organisation already but their membership
     *    is closed to expire as defined by the isMembershipAllowed() function
     */
    function purchaseMembership() payable {
        assert(isMembershipAllowed(msg.sender));
        assert(!applications.hasOpenApplication(msg.sender));
        assert(msg.value == price);
        escrow[msg.sender] += price;
        applications.submitApplication(msg.sender);
        MembershipRequested(msg.sender, price);
    }

    function withdrawApplication() {
        assert(applications.hasOpenApplication(msg.sender));
        var paid = escrow[msg.sender];
        escrow[msg.sender] -= paid;
        balance[msg.sender] += paid;
        applications.withdrawApplication(msg.sender);
        MembershipRequestWithdrawn(msg.sender, paid);
    }

    /**
     * Lets anyone withdraw any funds due to them from this contract
     */
    function withdraw() {
        var _amount = balance[msg.sender];
        balance[msg.sender] -= _amount;
        msg.sender.transfer(_amount);
        FundsWithdrawn(msg.sender, _amount, balance[msg.sender]);
    }

    /**
     * Determines whether the given address is allowed to purchase membership. This is true
     * if the address is not already a member of the organisation OR the expiry timestamp
     * is within the renewal period (ie. 30 days before expiry).
     */
    function isMembershipAllowed(address _member) constant returns (bool) {
        var expiryDate = membershipContract.getMembershipExpiryDate(_member);
        return expiryDate == 0 || now >= expiryDate - 30 days;
    }

    function applicationApproved(address _applicant, address _approver) byApplicationsContract {
        var paid = escrow[_applicant];
        escrow[_applicant] -= paid;
        balance[owner] += paid;
        membershipContract.enroll(_applicant, duration);
        MembershipPurchased(_applicant, paid, duration, membershipContract.getMembershipExpiryDate(_applicant));
    }

    function applicationRejected(address _applicant, address _approver) byApplicationsContract {
        var paid = escrow[_applicant];
        escrow[_applicant] -= paid;
        balance[_applicant] += paid;
        MembershipRejected(msg.sender, paid);
    }

    function() payable {
        purchaseMembership();
    }

}