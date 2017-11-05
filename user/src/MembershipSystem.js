import CompiledContracts from 'eth-membership-contracts/compiled.json'
import moment from 'moment';

const EventEmitter = require('events').EventEmitter;

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


function MembershipSystem(web3, code) {

    let system;
    if (typeof (code) === 'string') {
        system = JSON.parse(atob(code));
    } else if (typeof (code) === 'object') {
        system = code;
    } else {
        throw new Error('system code must be base64-encoded JSON string or object');
    }

    const emitter = new EventEmitter();

    const ethApplicationRegistrar = web3.eth.contract(CompiledContracts['EthApplicationRegistrar.sol:EthApplicationRegistrar'].abi).at(system.contracts.purchaseUsingEther);
    let defaultAccount = '0x0';
    let accounts = [];
    let price = '0';
    let duration = '0';
    let watches = [];

    const firePriceChanged = function () {
        let newPrice = web3.fromWei(price, 'ether');
        emitter.emit('price', newPrice.toString());
    };

    ethApplicationRegistrar.price(function (err, data) {
        if (err) {
            console.error('Error retrieving price from contract: ', err);
        } else {
            price = data;
            firePriceChanged();
        }
    });

    watches.push(ethApplicationRegistrar.PriceChanged([], function (err, result) {
        if (err) {
            console.error('Error occurred watching for price changes: ', err)
        } else {
            price = result.args.newPrice;
            firePriceChanged();
        }
    }));

    const fireDurationChanged = function () {
        let newDuration = moment.duration(duration.toNumber(), 'seconds').months() + ' months';
        emitter.emit('duration', newDuration)
    };

    ethApplicationRegistrar.duration(function (err, data) {
        if (err) {
            console.error('Error retrieving duration from contract: ', err);
        } else {
            duration = data;
            fireDurationChanged();
        }
    });

    watches.push(ethApplicationRegistrar.DurationChanged([], function (err, result) {
        if (err) {
            console.error('Error occurred watching for duration changes: ', err)
        } else {
            duration = result.args.newDuration;
            fireDurationChanged();
        }
    }));

    const accountsWatch = setInterval(() => {
        const newDefaultAccount = web3.eth.defaultAccount;
        const newAccounts = web3.eth.accounts;

        if (!arraysEqual(newAccounts, accounts)) {
            accounts = newAccounts;
            emitter.emit('accounts', accounts);
        }

        if (newDefaultAccount !== defaultAccount) {
            defaultAccount = newDefaultAccount;
            emitter.emit('defaultAccount', defaultAccount);
        }
    }, 1000);

    return {
        decoded: function () {
            return system;
        },
        price: function () {
            return web3.fromWei(price, 'ether');
        },
        duration: function () {
            return moment.duration(duration, 'seconds').months() + ' months';
        },
        defaultAccount: function () {
            return defaultAccount;
        },
        accounts: function () {
            return accounts;
        },
        onDefaultAccountChanged: function (callback) {
            emitter.on('defaultAccount', callback);
        },
        onAccountsChanged: function (callback) {
            emitter.on('accounts', callback);
        },
        onPriceChange: function (callback) {
            emitter.on('price', callback)
        },
        onDurationChange: function (callback) {
            emitter.on('duration', callback);
        },
        startPurchase: function () {
            const txData = ethApplicationRegistrar.purchaseMembership.getData({
                value: price
            });
            return new Promise((resolve, reject) => {
                web3.eth.estimateGas({
                    value: price,
                    to: ethApplicationRegistrar.address,
                    from: defaultAccount,
                    data: txData
                }, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            }).then((gasEstimate) => {
                return new Promise((resolve, reject) => {
                    ethApplicationRegistrar.purchaseMembership({
                        value: price,
                        gasPrice: web3.toWei('4', 'gwei'),
                        gasLimit: gasEstimate,
                        from: web3.eth.coinbase
                    }, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                })
            });
        },
        disconnect: function () {
            watches.forEach((watch) => {
                watch.stopWatching();
            });
            clearInterval(accountsWatch);
        }
    }

}

export {MembershipSystem};