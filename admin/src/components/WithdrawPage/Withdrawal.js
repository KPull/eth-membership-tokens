import {Compiled} from "../Common/Contracts"

const loadCompiledContracts = function () {
  return new Promise(function (resolve) {
    resolve(Compiled);
  });
};

const getBalanceForAccount = function (contract, account) {
  const web3 = window.web3;
  return loadCompiledContracts().then((compiled) => {
    return new Promise(function (resolve, reject) {
      const abi = compiled['EthApplicationRegistrar.sol:EthApplicationRegistrar'].abi;
      const contract = web3.eth.contract(abi).at(contract);
      contract.balance(account, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

const withdrawAll = function (contractAddress, account) {
  const web3 = window.web3;
  const compiledContracts = loadCompiledContracts();
  const balance = getBalanceForAccount(contractAddress, account);
  const gasEstimate = Promise.all([compiledContracts, balance]).then((result) => {
    const compiled = result[0];
    const balance = result[1];

    const abi = compiled['EthApplicationRegistrar.sol:EthApplicationRegistrar'].abi;
    const contract = web3.eth.contract(abi).at(contractAddress);

    const data = contract.withdraw.getData(balance, {
      from: account
    });
    console.log('data ', data);
    return new Promise((resolve, reject) => {
      web3.eth.estimateGas({
        from: account,
        to: contractAddress,
        data: data
      }, (err, estimate) => {
        console.log('gas estimate: ', estimate);
        if (err) {
          reject(err);
        } else {
          resolve(estimate);
        }
      });
    });
  });
  return Promise.all([compiledContracts, balance, gasEstimate]).then((result) => {
    const compiled = result[0];
    const balance = result[1];
    const gasEstimate = result[2];

    const abi = compiled['EthApplicationRegistrar.sol:EthApplicationRegistrar'].abi;
    const contract = web3.eth.contract(abi).at(contractAddress);

    return new Promise((resolve, reject) => {
      contract.withdraw(balance, {
        from: account,
        gasLimit: gasEstimate,
        gasPrice: web3.toWei('4', 'gwei')
      }, (err, transactionHash) => {
        if (err) {
          reject(err);
        } else {
          resolve(transactionHash);
        }
      });
    });
  });
};

export { getBalanceForAccount, withdrawAll }
