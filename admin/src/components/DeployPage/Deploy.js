import { Compiled } from "../Common/Contracts"

const getWeb3 = function () {
  console.log(window.web3);
  if (typeof(window.web3) === 'undefined') {
    const Web3 = require('web3');
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  return window.web3;
};

const loadCompiledContracts = function () {
  return new Promise(function (resolve, reject) {
    resolve(Compiled);
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
          gasPrice: web3.toWei('4', 'gwei'),
          from: web3.eth.coinbase
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

const ExpiringMembership = contractFactory('ExpiringMembership.sol', 'ExpiringMembership');
const SingleApproval = contractFactory('SingleApproval.sol', 'SingleApproval');
const EthApplicationRegistrar = contractFactory('EthApplicationRegistrar.sol', 'EthApplicationRegistrar');

const MembershipSystem = function (priceInWei, durationInSeconds, personalDetailsUrl) {
  const web3 = getWeb3();
  const expiringMembership = ExpiringMembership();
  const singleApproval = SingleApproval();
  const ethApplicationRegistrar = Promise.all([expiringMembership, singleApproval]).then(function (contracts) {
    const expiringMembership = contracts[0];
    const singleApproval = contracts[1];
    return EthApplicationRegistrar(expiringMembership.address,
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

export {EthApplicationRegistrar, SingleApproval, ExpiringMembership, MembershipSystem};
