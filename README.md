# Ethereum Membership Tokens

This repository showcases some simple, example contracts:

1. `owned.sol`: A simple base contract that defines what it means for a contract to have an owner.
2. `ExpiringMembership.sol`: A contract which coordinates and keeps a register of memberships. Memberships will expire after
a certain amount of time. Memberships can be added (or revoked) by so-called registrars which can be people in the real-world
or even other smart contracts such as the `EthApplicationRegistrar` mentioned below.
3. `EthApplicationRegistrar.sol`: Allows Ethereum accounts to enroll to the `ExpiringMembership` contract by making a payment
in Ether. This contract defines a renewal period: the amount of time before membership expiry that membership can be renewed.

*These contracts are meant to serve as a a simple example of Ethereum smart contracts. More work must be done on them before they can
be considered ready for the real world. Use at your own risk!* 
