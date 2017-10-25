const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const path = require("path");

var web3 = typeof(web3) !== 'undefined'
    ? new Web3(web3.currentProvider)
    : new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const loadSources = function () {
    var directory = './node_modules/eth-membership-contracts';
    return new Promise(function (resolve, reject) {
        fs.readdir(directory, function (err, files) {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    }).then(function (files) {
        return Promise.all(files.filter(function (name) {
            return name.toLowerCase().endsWith('.sol');
        }).map(function (name) {
            const filename = path.join(directory, name);
            return new Promise(function (resolve, reject) {
                fs.readFile(filename, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            }).then(function (source) {
                return {
                    name: name,
                    source: source.toString()
                };
            });
        }));
    }).then(function (nameContentMappings) {
        return nameContentMappings.reduce(function (accumulator, currentValue) {
            accumulator[currentValue.name] = currentValue.source;
            return accumulator;
        }, {});
    });
};

const contractFactory = function (solidityFile, contractName) {
    return function () {
        const contractArguments = Array.from(arguments);
        var Contract;
        var bytecode;
        var abi;
        return loadSources().then(function (sources) {
            const compiled = solc.compile({sources: sources}, 1).contracts[(solidityFile + ':' + contractName)];
            abi = JSON.parse(compiled.interface);
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

Deploy.MembershipSystem = function (priceInWei, durationInSeconds) {
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
            }
        }
    })
};

module.exports = Deploy;