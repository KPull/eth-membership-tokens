const Promise = require("bluebird");
const prompt = require('prompt');
const btoa = require('btoa');

const contract = require("truffle-contract");

const EthApplicationRegistrar = contract(require("eth-membership-contracts/contracts/EthApplicationRegistrar.json"));
const SingleApproval = contract(require("eth-membership-contracts/contracts/SingleApproval.json"));
const ExpiringMembership = contract(require("eth-membership-contracts/contracts/ExpiringMembership.json"));

const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

EthApplicationRegistrar.setProvider(provider);
SingleApproval.setProvider(provider);
ExpiringMembership.setProvider(provider);

function deployMembershipSystem() {
    const inputSchema = {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-06/schema#",
        "$id": "http://example.com/example.json",
        "type": "object",
        "properties": {
            "name": {
                "$id": "/properties/name",
                "type": "string",
                "title": "Organisation Name",
                "description": "The organisation name which will be accepting memberships",
            },
            "owner": {
                "$id": "/properties/owner",
                "type": "string",
                "title": "Owner Ethereum Account Address",
                "description": "The Ethereum account's address to deploy the membership system contracts",
                "pattern": "^0x[a-fA-F0-9]{40}$",
                "examples": [
                    "0x64e763555bb564f4ba07c98c15cb96d43bad4381"
                ]
            },
            "passphrase": {
                "$id": "/properties/passphrase",
                "type": "string",
                "title": "Passphrase",
                "description": "The passphrase to use use when unlocking the account on the remote Ethereum node",
                "hidden": true
            },
            "priceInEther": {
                "$id": "/properties/priceInEther",
                "type": "number",
                "title": "Price (in Ether)",
                "description": "The price, in ether, to purchase a membership subscription",
                "examples": [
                    0.0010000000474974513
                ],
            },
            "durationInDays": {
                "$id": "/properties/durationInDays",
                "type": "integer",
                "title": "Duration (in days)",
                "description": "The number of days before membership expires, after it has been purchased",
                "default": 365,
                "examples": [
                    365
                ]
            }

        },
        "required": [
            "name",
            "owner",
            "priceInEther",
        ]
    };
    prompt.start();
    prompt.get(inputSchema, (err, {name, owner, passphrase, priceInEther, durationInDays}) => {
            const txOptions = {
                from: owner,
                gas: web3.toBigNumber('2000000'),
                gasPrice: web3.toWei('4', 'gwei')
            };
            const purchaseTxOptions = (from) => ({
                from: from,
                gas: web3.toBigNumber('2000000'),
                gasPrice: web3.toWei('4', 'gwei')
            });
            const priceInWei = web3.toWei(priceInEther, 'ether');
            const durationInSeconds = web3.toBigNumber(durationInDays).times(24).times(60).times(60);
            new Promise((resolve, reject) => {
                if (!passphrase || passphrase === '') {
                    resolve();
                } else {
                    web3.personal.unlockAccount(owner, passphrase);
                    resolve();
                }
            }).then(() => {
                return Promise.all([ExpiringMembership.new(txOptions), SingleApproval.new(txOptions)]);
            }).spread((expiringMembership, singleApproval) => {
                return Promise.all([
                    expiringMembership,
                    singleApproval,
                    EthApplicationRegistrar.new(expiringMembership.address, singleApproval.address, priceInWei, durationInSeconds, txOptions)
                ]);
            }).spread((expiringMembership, singleApproval, ethApplicationRegistrar) => {
                return Promise.all([
                    expiringMembership,
                    singleApproval,
                    ethApplicationRegistrar,
                    expiringMembership.addRegistrar(ethApplicationRegistrar.address, "Ether Application Registrar", txOptions),
                    singleApproval.addApplicationSource(ethApplicationRegistrar.address, "Ether Application Registrar", txOptions)
                ]);
            }).spread((expiringMembership, singleApproval, ethApplicationRegistrar, tx1, tx2) => {
                return Promise.all([
                    expiringMembership,
                    singleApproval,
                    ethApplicationRegistrar,
                    Math.max(tx1.receipt.blockNumber, tx2.receipt.blockNumber),
                    ethApplicationRegistrar.purchaseMembership({
                        ...purchaseTxOptions(web3.eth.accounts[0]),
                        value: priceInWei
                    }),
                    ethApplicationRegistrar.purchaseMembership({
                        ...purchaseTxOptions(web3.eth.accounts[1]),
                        value: priceInWei
                    }),
                    ethApplicationRegistrar.purchaseMembership({
                        ...purchaseTxOptions(web3.eth.accounts[2]),
                        value: priceInWei
                    }),
                    ethApplicationRegistrar.purchaseMembership({
                        ...purchaseTxOptions(web3.eth.accounts[3]),
                        value: priceInWei
                    }),
                    ethApplicationRegistrar.purchaseMembership({
                        ...purchaseTxOptions(web3.eth.accounts[4]),
                        value: priceInWei
                    }),
                ]);
            }).spread((expiringMembership, singleApproval, ethApplicationRegistrar, firstBlock) => {
                const systemCode = {
                    name: name,
                    expiringMembership: expiringMembership.address,
                    singleApproval: singleApproval.address,
                    ethApplicationRegistrar: ethApplicationRegistrar.address,
                    firstBlock: firstBlock.toString()
                };
                return {
                    ...systemCode,
                    code: btoa(JSON.stringify(systemCode))
                }
            }).then((systemCode) => {
                if (passphrase && passphrase !== '') {
                    web3.personal.lockAccount(owner);
                }
                console.log(systemCode);
            });
        }
    )
    ;
}

deployMembershipSystem();