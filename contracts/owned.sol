pragma solidity ^0.4.11;

contract owned {

    event OwnerChanged(address oldOwner, address newOwner);

    address public owner;

    modifier byOwner() {
        assert(msg.sender == owner);
        _;
    }

    function changeOwner(address _owner) byOwner {
        owner = _owner;
        OwnerChanged(msg.sender, _owner);
    }

}