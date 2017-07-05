pragma solidity ^0.4.11;

import "./owned.sol";
import "./ExpiringMembership.sol";

/**
 * This contract connects to an ExpiringMembership contract and allows the purchase
 * of membership tokens using Ether
 */
contract EtherPaymentRegistrar is owned {

    event PriceChanged(address owner, uint oldPrice, uint newPrice);
    event DurationChanged(address owner, uint oldDuration, uint newDuration);
    event MembershipPurchased(address member, uint price, uint duration, uint expiry);
    event FundsWithdrawn(address owner, uint amount, uint balance);

    /**
     * The address where we are purchasing membership tokens at
     */
    ExpiringMembership public membershipContract;

    /**
     * The price for purchasing a single membership token
     */
    uint public price;

    /**
     * The length of time that a membership token, purchased with this contract,
     * will last
     */
    uint public duration;

    /**
     * The withdrawable balance available to this contract's owner in wei
     */
    uint public balance;

    function EtherPaymentRegistrar(ExpiringMembership _membershipContract, uint _price, uint _duration) {
        owner = msg.sender;
        membershipContract = _membershipContract;
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
     * Purchase a single membership token using Ether. The purchase will be successful if
     * the message contains the amount of Ether indicated by the price and any one of the
     * following:
     * 1. The message sender (or payer) is not a member of the organisation already.
     * 2. The message sender is a member of the organisation already but their membership
     *    is closed to expire as defined by the isMembershipAllowed() functiono
     */
    function purchaseMembership() payable {
        assert(isMembershipAllowed(msg.sender));
        assert(msg.value == price);
        balance += price;
        membershipContract.enroll(msg.sender, duration);
        MembershipPurchased(msg.sender, price, duration, membershipContract.getMembershipExpiryDate(msg.sender));
    }

    /**
     * Let's this contract's owner withdraw any funds collected through membership
     * purchases
     */
    function withdraw(uint _amount) byOwner {
        assert(_amount <= balance);
        balance -= _amount;
        msg.sender.transfer(_amount);
        FundsWithdrawn(msg.sender, _amount, balance);
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

}