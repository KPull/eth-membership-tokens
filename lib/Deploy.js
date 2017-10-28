const compiled = {
    "Application.sol:Application": {
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    }
                ],
                "name": "submitApplication",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    }
                ],
                "name": "withdrawApplication",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    }
                ],
                "name": "hasOpenApplication",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ],
        "bytecode": ""
    },
    "ApplicationSource.sol:ApplicationSource": {
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    },
                    {
                        "name": "_approver",
                        "type": "address"
                    }
                ],
                "name": "applicationApproved",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    },
                    {
                        "name": "_approver",
                        "type": "address"
                    }
                ],
                "name": "applicationRejected",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "bytecode": ""
    },
    "EthApplicationRegistrar.sol:EthApplicationRegistrar": {
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    },
                    {
                        "name": "_approver",
                        "type": "address"
                    }
                ],
                "name": "applicationApproved",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "duration",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_member",
                        "type": "address"
                    }
                ],
                "name": "isMembershipAllowed",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "withdrawApplication",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "purchaseMembership",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "membershipContract",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "escrow",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "applications",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    },
                    {
                        "name": "_approver",
                        "type": "address"
                    }
                ],
                "name": "applicationRejected",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "price",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "name": "changePrice",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "changeOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_duration",
                        "type": "uint256"
                    }
                ],
                "name": "changeDuration",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_membershipContract",
                        "type": "address"
                    },
                    {
                        "name": "_applications",
                        "type": "address"
                    },
                    {
                        "name": "_price",
                        "type": "uint256"
                    },
                    {
                        "name": "_duration",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "oldPrice",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "newPrice",
                        "type": "uint256"
                    }
                ],
                "name": "PriceChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "oldDuration",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "newDuration",
                        "type": "uint256"
                    }
                ],
                "name": "DurationChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "member",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "MembershipRequested",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "member",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "expiry",
                        "type": "uint256"
                    }
                ],
                "name": "MembershipPurchased",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "member",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "refunded",
                        "type": "uint256"
                    }
                ],
                "name": "MembershipRejected",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "member",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "refunded",
                        "type": "uint256"
                    }
                ],
                "name": "MembershipRequestWithdrawn",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "account",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "name": "FundsWithdrawn",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "oldOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnerChanged",
                "type": "event"
            }
        ],
        "bytecode": "6060604052341561000f57600080fd5b604051608080610b838339810160405280805191906020018051919060200180519190602001805160008054600160a060020a03338116600160a060020a0319928316179092556001805498831698821698909817909755600480549690911695909616949094179094555060025560035550610af2806100916000396000f3006060604052600436106100cc5763ffffffff60e060020a60003504166303e3b1ed81146100d15780630fb5a6b4146100f8578063189eeebe1461011d5780631fcf55ff146101505780632e1a7d4d1461016357806347bbe8671461017957806351ec8d1e1461018157806357d3c7c3146101b05780637ce5e82f146101cf5780638da5cb5b146101e25780639371c369146101f5578063a035b1fe1461021a578063a2b40d191461022d578063a6f9dae114610243578063b594f08614610262578063e3d670d714610278575b600080fd5b34156100dc57600080fd5b6100f6600160a060020a0360043581169060243516610297565b005b341561010357600080fd5b61010b61042f565b60405190815260200160405180910390f35b341561012857600080fd5b61013c600160a060020a0360043516610435565b604051901515815260200160405180910390f35b341561015b57600080fd5b6100f66104c7565b341561016e57600080fd5b6100f660043561061c565b6100f6610707565b341561018c57600080fd5b610194610869565b604051600160a060020a03909116815260200160405180910390f35b34156101bb57600080fd5b61010b600160a060020a0360043516610878565b34156101da57600080fd5b61019461088a565b34156101ed57600080fd5b610194610899565b341561020057600080fd5b6100f6600160a060020a03600435811690602435166108a8565b341561022557600080fd5b61010b61093f565b341561023857600080fd5b6100f6600435610945565b341561024e57600080fd5b6100f6600160a060020a03600435166109c0565b341561026d57600080fd5b6100f6600435610a39565b341561028357600080fd5b61010b600160a060020a0360043516610ab4565b60045460009033600160a060020a039081169116146102b257fe5b50600160a060020a03808316600090815260056020908152604080832080549084905583548516845260069092529182902080548201905560015460035491931691636111ca219186915160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401600060405180830381600087803b151561033d57600080fd5b6102c65a03f1151561034e57600080fd5b50506003546001547fb75f978cbc4cec9b52790196926704ebc43dec7446bab066f68898b10c7ac0d5925085918491600160a060020a03166310875ac08460006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156103d357600080fd5b6102c65a03f115156103e457600080fd5b505050604051805190506040518085600160a060020a0316600160a060020a0316815260200184815260200183815260200182815260200194505050505060405180910390a1505050565b60035481565b6001546000908190600160a060020a03166310875ac084836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561049257600080fd5b6102c65a03f115156104a357600080fd5b50505060405180519150508015806104c0575062278d0081034210155b9392505050565b600454600090600160a060020a031663a81a3e4d33836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561052257600080fd5b6102c65a03f1151561053357600080fd5b50505060405180519050151561054557fe5b50600160a060020a0333818116600090815260056020908152604080832080549084905560069092529182902080548201905560045490931691638f08e369915160e060020a63ffffffff8416028152600160a060020a039091166004820152602401600060405180830381600087803b15156105c157600080fd5b6102c65a03f115156105d257600080fd5b5050507f4c024c2947f1422136bca68f4619c44125747d2cbc627acd97ba9db92f3155f93382604051600160a060020a03909216825260208201526040908101905180910390a150565b600160a060020a03331660009081526006602052604090205481111561063e57fe5b600160a060020a033316600081815260066020526040908190208054849003905582156108fc0290839051600060405180830381858888f19350505050151561068657600080fd5b7ffbc3a599b784fe88772fc5abcc07223f64ca0b13acc341f4fb1e46bef0510eb433826006600033600160a060020a0316600160a060020a03168152602001908152602001600020546040518084600160a060020a0316600160a060020a03168152602001838152602001828152602001935050505060405180910390a150565b61071033610435565b151561071857fe5b600454600160a060020a031663a81a3e4d3360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561077157600080fd5b6102c65a03f1151561078257600080fd5b505050604051805115905061079357fe5b600254341461079e57fe5b60025433600160a060020a038181166000908152600560205260409081902080549094019093556004541691632611341b91905160e060020a63ffffffff8416028152600160a060020a039091166004820152602401600060405180830381600087803b151561080d57600080fd5b6102c65a03f1151561081e57600080fd5b5050507fb6182f67d466f39bf82aad7780345123ff239d44544bbe5f576f9115d58811b733600254604051600160a060020a03909216825260208201526040908101905180910390a1565b600154600160a060020a031681565b60056020526000908152604090205481565b600454600160a060020a031681565b600054600160a060020a031681565b60045460009033600160a060020a039081169116146108c357fe5b50600160a060020a0382166000908152600560209081526040808320805490849055600690925291829020805482019055907f4f78daf20bdbd747be24789e39aa0af59d21878853845f0e7dcf4dd669704bbf903390839051600160a060020a03909216825260208201526040908101905180910390a1505050565b60025481565b60005433600160a060020a0390811691161461096057600080fd5b7f4d624906ce6fd4e4b8b649463516ff505029a1903a8cc34bd82b4ca0f9a479de33600254836040518084600160a060020a0316600160a060020a03168152602001838152602001828152602001935050505060405180910390a1600255565b60005433600160a060020a039081169116146109db57600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038381169182179092559033167fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c60405160405180910390a350565b60005433600160a060020a03908116911614610a5457600080fd5b7fabe82bf94ac08157c0fd88b25b756bb1a7f0d69ed7bfcdc5cbfb07bcafe5d82433600354836040518084600160a060020a0316600160a060020a03168152602001838152602001828152602001935050505060405180910390a1600355565b600660205260009081526040902054815600a165627a7a72305820e336e8c22505a512bbdbb6f5a340b5b6d227a08d20793b14e6f0067c713b85960029"
    },
    "ExpiringMembership.sol:ExpiringMembership": {
        "abi": [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "members",
                "outputs": [
                    {
                        "name": "expiryTimestamp",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_member",
                        "type": "address"
                    }
                ],
                "name": "getMembershipExpiryDate",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_member",
                        "type": "address"
                    },
                    {
                        "name": "duration",
                        "type": "uint256"
                    }
                ],
                "name": "enroll",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_member",
                        "type": "address"
                    }
                ],
                "name": "revoke",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_registrar",
                        "type": "address"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "addRegistrar",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_member",
                        "type": "address"
                    }
                ],
                "name": "isMember",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "changeOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_registrar",
                        "type": "address"
                    }
                ],
                "name": "removeRegistrar",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "isRegistrar",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "registrar",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "RegistrarAdded",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "registrar",
                        "type": "address"
                    }
                ],
                "name": "RegistrarRemoved",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "member",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "registrar",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "expiryTimestamp",
                        "type": "uint256"
                    }
                ],
                "name": "NewMemberRegistered",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "member",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "registrar",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "expiryTimestamp",
                        "type": "uint256"
                    }
                ],
                "name": "MembershipExtended",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "member",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "revoker",
                        "type": "address"
                    }
                ],
                "name": "MembershipRevoked",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "oldOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnerChanged",
                "type": "event"
            }
        ],
        "bytecode": "6060604052341561000f57600080fd5b60008054600160a060020a033316600160a060020a03199091161790556106e28061003b6000396000f3006060604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166308ae4b0c81146100a857806310875ac0146100d95780636111ca21146100f857806374a8f1031461011c5780638da5cb5b1461013b5780638e3d53031461016a578063a230c524146101c9578063a6f9dae1146101fc578063ba904eed1461021b578063d5db72eb1461023a575b600080fd5b34156100b357600080fd5b6100c7600160a060020a0360043516610259565b60405190815260200160405180910390f35b34156100e457600080fd5b6100c7600160a060020a036004351661026b565b341561010357600080fd5b61011a600160a060020a0360043516602435610286565b005b341561012757600080fd5b61011a600160a060020a03600435166102f1565b341561014657600080fd5b61014e610393565b604051600160a060020a03909116815260200160405180910390f35b341561017557600080fd5b61011a60048035600160a060020a03169060446024803590810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506103a295505050505050565b34156101d457600080fd5b6101e8600160a060020a03600435166104ac565b604051901515815260200160405180910390f35b341561020757600080fd5b61011a600160a060020a03600435166104c0565b341561022657600080fd5b61011a600160a060020a0360043516610539565b341561024557600080fd5b6101e8600160a060020a03600435166105d2565b60026020526000908152604090205481565b600160a060020a031660009081526002602052604090205490565b60005433600160a060020a03908116911614806102bb5750600160a060020a03331660009081526001602052604090205460ff165b15156102c657600080fd5b6102cf826104ac565b156102e3576102de82826105e7565b6102ed565b6102ed828261064f565b5050565b60005433600160a060020a03908116911614806103265750600160a060020a03331660009081526001602052604090205460ff165b151561033157600080fd5b61033a816104ac565b151561034257fe5b600160a060020a038082166000818152600260205260409081902042905533909216917f82bce7ec90948d952b025ea9b0ffb6619135f201870c12cbd0750e399c91b2d7905160405180910390a350565b600054600160a060020a031681565b60005433600160a060020a039081169116146103bd57600080fd5b600160a060020a03821660009081526001602052604090205460ff16156103e3576102ed565b600160a060020a03808316600081815260016020819052604091829020805460ff1916909117905590913316907fe443cfae1e559936e4c5049a178c87e2fe60594df4ca7efa6844ec40739f3b8b9084905160208082528190810183818151815260200191508051906020019080838360005b8381101561046e578082015183820152602001610456565b50505050905090810190601f16801561049b5780820380516001836020036101000a031916815260200191505b509250505060405180910390a35050565b60006104b78261026b565b42111592915050565b60005433600160a060020a039081169116146104db57600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038381169182179092559033167fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c60405160405180910390a350565b60005433600160a060020a0390811691161461055457600080fd5b600160a060020a03811660009081526001602052604090205460ff16151561057b576105cf565b600160a060020a0380821660008181526001602052604090819020805460ff1916905590913316907f51f386f5b759b15784371710b08702c499d00565174be6845e2d419bcde4186a905160405180910390a35b50565b60016020526000908152604090205460ff1681565b600160a060020a0380831660008181526002602052604090819020805485019081905592331691907f1ddcc5565b7943b63e73e8feaadae2d08bfc711af95370ba1676cdbbbae452ea90859085905191825260208201526040908101905180910390a3505050565b600160a060020a03808316600081815260026020526040908190204285019081905592331691907f6b0d2f704f9b0af605246f10faab6129f9a06e1257e4b19ffe8db6366b68100990859085905191825260208201526040908101905180910390a35050505600a165627a7a72305820685f856f332eea19a21bee9d4834d18e7ae5f9f883abafde73618afb3e43cf9f0029"
    },
    "Migrations.sol:Migrations": {
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "new_address",
                        "type": "address"
                    }
                ],
                "name": "upgrade",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "last_completed_migration",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "completed",
                        "type": "uint256"
                    }
                ],
                "name": "setCompleted",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ],
        "bytecode": "6060604052341561000f57600080fd5b60008054600160a060020a033316600160a060020a03199091161790556101e78061003b6000396000f3006060604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630900f0108114610066578063445df0ac146100875780638da5cb5b146100ac578063fdacd576146100db575b600080fd5b341561007157600080fd5b610085600160a060020a03600435166100f1565b005b341561009257600080fd5b61009a610186565b60405190815260200160405180910390f35b34156100b757600080fd5b6100bf61018c565b604051600160a060020a03909116815260200160405180910390f35b34156100e657600080fd5b61008560043561019b565b6000805433600160a060020a03908116911614156101825781905080600160a060020a031663fdacd5766001546040517c010000000000000000000000000000000000000000000000000000000063ffffffff84160281526004810191909152602401600060405180830381600087803b151561016d57600080fd5b6102c65a03f1151561017e57600080fd5b5050505b5050565b60015481565b600054600160a060020a031681565b60005433600160a060020a03908116911614156101b85760018190555b505600a165627a7a7230582031ec61425fe567b1e2d2a431fa2ef32f041ab915c9f7216331db8627b53718900029"
    },
    "SingleApproval.sol:SingleApproval": {
        "abi": [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "approvers",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_source",
                        "type": "address"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "addApplicationSource",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    }
                ],
                "name": "submitApplication",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_source",
                        "type": "address"
                    },
                    {
                        "name": "_applicant",
                        "type": "address"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "approveApplication",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_approver",
                        "type": "address"
                    }
                ],
                "name": "removeApprover",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "source",
                        "type": "address"
                    },
                    {
                        "name": "_applicant",
                        "type": "address"
                    }
                ],
                "name": "hasOpenApplicationFromSource",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_source",
                        "type": "address"
                    }
                ],
                "name": "removeApplicationSource",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    }
                ],
                "name": "withdrawApplication",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_approver",
                        "type": "address"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "addApprover",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "changeOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_applicant",
                        "type": "address"
                    }
                ],
                "name": "hasOpenApplication",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "sources",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_source",
                        "type": "address"
                    },
                    {
                        "name": "_applicant",
                        "type": "address"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "rejectApplication",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "applications",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "approver",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "ApproverAdded",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "approver",
                        "type": "address"
                    }
                ],
                "name": "ApproverRemoved",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "source",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "ApplicationSourceAdded",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "source",
                        "type": "address"
                    }
                ],
                "name": "ApplicationSourceRemoved",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "source",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "applicant",
                        "type": "address"
                    }
                ],
                "name": "ApplicationSubmitted",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "source",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "applicant",
                        "type": "address"
                    }
                ],
                "name": "ApplicationWithdrawn",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "approver",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "source",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "applicant",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "ApplicationRejected",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "approver",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "source",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "applicant",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "ApplicationApproved",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "oldOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnerChanged",
                "type": "event"
            }
        ],
        "bytecode": "6060604052341561000f57600080fd5b60008054600160a060020a033316600160a060020a0319909116179055610d098061003b6000396000f3006060604052600436106100c15763ffffffff60e060020a6000350416630a14439181146100c657806316bab8ad146100f95780632611341b1461015a57806328fbb45a146101795780636cf4c88f146101e25780638a7c2d6d146102015780638da5cb5b146102265780638deeecbe146102555780638f08e3691461027457806394ffb81914610293578063a6f9dae1146102f2578063a81a3e4d14610311578063b750bdde14610330578063cec97c621461034f578063e3edf5c2146103b8575b600080fd5b34156100d157600080fd5b6100e5600160a060020a03600435166103dd565b604051901515815260200160405180910390f35b341561010457600080fd5b61015860048035600160a060020a03169060446024803590810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506103f295505050505050565b005b341561016557600080fd5b610158600160a060020a03600435166104fd565b341561018457600080fd5b610158600160a060020a036004803582169160248035909116919060649060443590810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506105d395505050505050565b34156101ed57600080fd5b610158600160a060020a036004351661077f565b341561020c57600080fd5b6100e5600160a060020a0360043581169060243516610818565b341561023157600080fd5b610239610846565b604051600160a060020a03909116815260200160405180910390f35b341561026057600080fd5b610158600160a060020a0360043516610855565b341561027f57600080fd5b610158600160a060020a03600435166108ed565b341561029e57600080fd5b61015860048035600160a060020a03169060446024803590810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506109c195505050505050565b34156102fd57600080fd5b610158600160a060020a0360043516610a8a565b341561031c57600080fd5b6100e5600160a060020a0360043516610b03565b341561033b57600080fd5b6100e5600160a060020a0360043516610b15565b341561035a57600080fd5b610158600160a060020a036004803582169160248035909116919060649060443590810190830135806020601f82018190048102016040519081016040528181529291906020840183838082843750949650610b2a95505050505050565b34156103c357600080fd5b6100e5600160a060020a0360043581169060243516610cbd565b60026020526000908152604090205460ff1681565b60005433600160a060020a0390811691161461040d57600080fd5b600160a060020a03821660009081526001602052604090205460ff1615610433576104f9565b600160a060020a03808316600081815260016020819052604091829020805460ff1916909117905590913316907f473dbe14789c5449499a62332e29fca7e338f77ce8e38406c6843a2a45347fe89084905160208082528190810183818151815260200191508051906020019080838360005b838110156104be5780820151838201526020016104a6565b50505050905090810190601f1680156104eb5780820380516001836020036101000a031916815260200191505b509250505060405180910390a35b5050565b600160a060020a03331660009081526001602052604081205460ff1680610532575060005433600160a060020a039081169116145b151561053d57600080fd5b5033600160a060020a0381811660009081526003602090815260408083209386168352929052205460ff161561056f57fe5b600160a060020a0380821660008181526003602090815260408083209487168084529490915290819020805460ff191660011790557f201a1c508c9fef94b7b58ea0808928ebc0be91fc8d35eeadfbd7077180db8823905160405180910390a35050565b600160a060020a03331660009081526002602052604090205460ff1680610608575060005433600160a060020a039081169116145b151561061357600080fd5b600160a060020a0380841660009081526003602090815260408083209386168352929052205460ff16151561064457fe5b600160a060020a038084166000818152600360209081526040808320878616808552925291829020805460ff19169055923316907f8e2fffec58aa0cbac732233edf757ddf9e5526343134bd89b12b4ecf693cae399085905160208082528190810183818151815260200191508051906020019080838360005b838110156106d65780820151838201526020016106be565b50505050905090810190601f1680156107035780820380516001836020036101000a031916815260200191505b509250505060405180910390a482600160a060020a03166303e3b1ed833360405160e060020a63ffffffff8516028152600160a060020a03928316600482015291166024820152604401600060405180830381600087803b151561076657600080fd5b6102c65a03f1151561077757600080fd5b505050505050565b60005433600160a060020a0390811691161461079a57600080fd5b600160a060020a03811660009081526002602052604090205460ff1615156107c157610815565b600160a060020a0380821660008181526002602052604090819020805460ff1916905590913316907ffd9a4771ee9b4f95e69b47c9ef2d86cc2228981bc45f7da8a3a906d8b792d1d8905160405180910390a35b50565b600160a060020a03918216600090815260036020908152604080832093909416825291909152205460ff1690565b600054600160a060020a031681565b60005433600160a060020a0390811691161461087057600080fd5b600160a060020a03811660009081526001602052604090205460ff16151561089757610815565b600160a060020a0380821660008181526001602052604090819020805460ff1916905590913316907ffd9a4771ee9b4f95e69b47c9ef2d86cc2228981bc45f7da8a3a906d8b792d1d8905160405180910390a350565b600160a060020a03331660009081526001602052604081205460ff1680610922575060005433600160a060020a039081169116145b151561092d57600080fd5b5033600160a060020a0381811660009081526003602090815260408083209386168352929052205460ff16151561096057fe5b600160a060020a0380821660008181526003602090815260408083209487168084529490915290819020805460ff191690557f1d1be4bfb8aca953b25c5018677118325eef3059105f90072653e804aacb047a905160405180910390a35050565b60005433600160a060020a039081169116146109dc57600080fd5b600160a060020a03821660009081526002602052604090205460ff1615610a02576104f9565b600160a060020a0380831660008181526002602052604090819020805460ff1916600117905590913316907fe1840daeb654f5d5393005bb39b87499e284b558990467fb14a0e2d518e6814f908490516020808252819081018381815181526020019150805190602001908083836000838110156104be5780820151838201526020016104a6565b60005433600160a060020a03908116911614610aa557600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038381169182179092559033167fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c60405160405180910390a350565b6000610b0f3383610818565b92915050565b60016020526000908152604090205460ff1681565b600160a060020a03331660009081526002602052604090205460ff1680610b5f575060005433600160a060020a039081169116145b1515610b6a57600080fd5b600160a060020a0380841660009081526003602090815260408083209386168352929052205460ff161515610b9b57fe5b600160a060020a038084166000818152600360209081526040808320878616808552925291829020805460ff19169055923316907f82533bc3de0aaca1ae1dc985bfef846ef796994908ad2915b98688f5277de3e19085905160208082528190810183818151815260200191508051906020019080838360005b83811015610c2d578082015183820152602001610c15565b50505050905090810190601f168015610c5a5780820380516001836020036101000a031916815260200191505b509250505060405180910390a482600160a060020a0316639371c369833360405160e060020a63ffffffff8516028152600160a060020a03928316600482015291166024820152604401600060405180830381600087803b151561076657600080fd5b600360209081526000928352604080842090915290825290205460ff16815600a165627a7a7230582016ef953dda533df0aeff17b228c48ee4fe1cbf6fc66e68db863c7e6df536a6190029"
    },
    "owned.sol:owned": {
        "abi": [
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "changeOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "oldOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnerChanged",
                "type": "event"
            }
        ],
        "bytecode": "6060604052341561000f57600080fd5b6101958061001e6000396000f30060606040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416638da5cb5b8114610050578063a6f9dae11461008c575b600080fd5b341561005b57600080fd5b6100636100ba565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b341561009757600080fd5b6100b873ffffffffffffffffffffffffffffffffffffffff600435166100d6565b005b60005473ffffffffffffffffffffffffffffffffffffffff1681565b6000543373ffffffffffffffffffffffffffffffffffffffff9081169116146100fe57600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff8381169182179092559033167fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c60405160405180910390a3505600a165627a7a72305820fc6613f8a599bc118d04d48f7d09381c5002e56c65135ea9beb09913ad09ce8f0029"
    }
};

const getWeb3 = function() {
    if (typeof(web3) === 'undefined') {
        // const Web3 = require('web3');
        const Web3 = require('web3');
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    return web3;
};

const loadCompiledContracts = function () {
    return new Promise(function (resolve, reject) {
        resolve(compiled);
    });
};

const contractFactory = function (solidityFile, contractName) {
    return function () {
        const contractArguments = Array.from(arguments);
        const web3 = getWeb3();
        var abi;
        var bytecode;
        var Contract;
        return loadCompiledContracts().then(function (compiledContracts) {
            const compiled = compiledContracts[(solidityFile + ':' + contractName)];
            abi = compiled.abi;
            bytecode = compiled.bytecode;
            Contract = web3.eth.contract(abi);
            return new Promise(function (resolve, reject) {
                const data = Contract.new.getData.apply(Contract, contractArguments.concat([{
                    data: bytecode
                }]));
                web3.eth.estimateGas({data: data}, function (err, gasEstimate) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(gasEstimate);
                    }
                });
            })
        }).then(function (gasEstimate) {
            return new Promise(function (resolve, reject) {
                Contract.new.apply(Contract, contractArguments.concat([{
                    data: bytecode,
                    gas: gasEstimate,
                    gasPrice: web3.toWei('4', 'gwei')
                }, function (err, contractInstance) {
                    if (err) {
                        reject(err);
                    } else if (contractInstance.address) {
                        resolve(contractInstance);
                    } else {
                        console.log(contractInstance);
                        console.log(contractName + ' contract deployment transaction submitted: ' + contractInstance.transactionHash);
                    }
                }]));
            });
        }).then(function (contractInstance) {
            console.log(contractName + ' contract deployed at address: ' + contractInstance.address);
            return contractInstance;
        });
    };
};

const Deploy = {
    ExpiringMembership: contractFactory('ExpiringMembership.sol', 'ExpiringMembership'),
    SingleApproval: contractFactory('SingleApproval.sol', 'SingleApproval'),
    EthApplicationRegistrar: contractFactory('EthApplicationRegistrar.sol', 'EthApplicationRegistrar')
};

Deploy.MembershipSystem = function (priceInWei, durationInSeconds, personalDetailsUrl) {
    const web3 = getWeb3();
    const expiringMembership = Deploy.ExpiringMembership();
    const singleApproval = Deploy.SingleApproval();
    const ethApplicationRegistrar = Promise.all([expiringMembership, singleApproval]).then(function (contracts) {
        const expiringMembership = contracts[0];
        const singleApproval = contracts[1];
        return Deploy.EthApplicationRegistrar(expiringMembership.address,
            singleApproval.address,
            priceInWei,
            durationInSeconds);
    });

    return Promise.all([expiringMembership, singleApproval, ethApplicationRegistrar]).then(function (contracts) {
        const expiringMembership = contracts[0];
        const singleApproval = contracts[1];
        const ethApplicationRegistrar = contracts[2];

        return {
            owner: web3.eth.defaultAccount,
            network: web3.version.network,
            contracts: {
                members: expiringMembership.address,
                approval: singleApproval.address,
                purchaseUsingEther: ethApplicationRegistrar.address
            },
            personalDetailsUrl: personalDetailsUrl
        }
    })
};

module.exports = Deploy;