import SingleApprovalJson from 'eth-membership-contracts/contracts/SingleApproval.json';
import EthApplicationRegistrarJson from 'eth-membership-contracts/contracts/EthApplicationRegistrar.json';
import contract from 'truffle-contract';
import Web3 from 'web3';

const SingleApproval = contract(SingleApprovalJson);
const EthApplicationRegistrar = contract(EthApplicationRegistrarJson);

const sortBlockchainEvents = function (events) {
    events.sort((left, right) => {
        if (left.blockNumber < right.blockNumber) {
            return -1;
        } else if (left.blockNumber > right.blockNumber) {
            return 1;
        } else if (left.transactionIndex < right.transactionIndex) {
            return -1;
        } else if (left.transactionIndex > right.transactionIndex) {
            return 1;
        } else if (left.logIndex < right.logIndex) {
            return -1;
        } else if (left.logIndex > right.logIndex) {
            return 1;
        } else {
            return 0;
        }
    });
};

const pushBlockchainEvent = function (events, event, extra) {
    events.push({
        blockNumber: event.blockNumber,
        transactionIndex: event.transactionIndex,
        transactionHash: event.transactionHash,
        logIndex: event.logIndex,
        source: event.args.source,
        applicant: event.args.applicant,
        ...extra
    });
};

const reduceEventsToPendingApplications = function (events) {
    return events.reduce((accumulator, currentValue) => {
        if (currentValue.operation === 'ADD') {
            return accumulator.concat([{
                transactionHash: currentValue.transactionHash,
                applicant: currentValue.applicant,
                source: currentValue.source
            }]);
        } else if (currentValue.operation === 'REMOVE') {
            return accumulator.filter((application) => {
                return !(application.applicant === currentValue.applicant && application.source === currentValue.source);
            });
        } else {
            throw new Error(`Operation ${currentValue.operation} not supported`);
        }
    }, []);
};

class System {

    constructor(code) {
        const deserialized = typeof (code) === 'string' ? JSON.parse(atob(code)) : code;
        Object.assign(this, deserialized);

        console.log('system:', this);

        this.code = btoa(JSON.stringify(deserialized));
        this.account = '0x';
        this.priceInEther = '0';
        this.durationInDays = '0';
        this.etherForOwner = '0';
        this.owner = '0x';
        this.pendingApplications = [];

        this.onOwnerChangedListeners = [];
        this.onPendingApplicationsChangedListeners = [];
        this.onPriceInEtherChangedListeners = [];
        this.onDurationInDaysChangedListeners = [];
        this.onEtherForOwnerChangedListeners = [];
    }

    startWatches(web3) {
        const provider = web3 && web3.currentProvider ? web3.currentProvider
            : new Web3.providers.HttpProvider('http://localhost:8545');
        this.web3 = web3 || new Web3(provider);

        SingleApproval.setProvider(provider);
        EthApplicationRegistrar.setProvider(provider);

        this.account = this.web3.eth.accounts[0];
        this.startEthApplicationRegistrarWatches();
        this.startSingleApprovalWatches();
    }

    startEthApplicationRegistrarWatches() {
        EthApplicationRegistrar.at(this.ethApplicationRegistrar).then((ethApplicationRegistrar) => {
            const updateEtherForOwner = (owner) => {
                ethApplicationRegistrar.balance(owner).then((balance) => {
                    this.setEtherForOwner(this.web3.fromWei(balance, 'ether').toString());
                });
            };

            ethApplicationRegistrar.price().then((price) => {
                this.setPriceInEther(this.web3.fromWei(price, 'ether').toString());
            });
            ethApplicationRegistrar.PriceChanged({}, {
                fromBlock: 'latest',
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for price changes: ', error);
                } else {
                    this.setPriceInEther(this.web3.fromWei(result.args.newPrice, 'ether').toString());
                }
            });
            ethApplicationRegistrar.duration().then((duration) => {
                this.setDurationInDays(duration.div(60).div(60).div(24).toString());
            });
            ethApplicationRegistrar.DurationChanged({}, {
                fromBlock: 'latest',
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for duration changes: ', error);
                } else {
                    this.setDurationInDays(result.args.newDuration.div(60).div(60).div(24).toString());
                }
            });
            ethApplicationRegistrar.owner().then((owner) => {
                this.setOwner(owner);
            });
            ethApplicationRegistrar.OwnerChanged({}, {
                fromBlock: 'latest',
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for owner changes: ', error);
                } else {
                    this.setOwner(result.args.newOwner);
                }
            });
            ethApplicationRegistrar.FundsWithdrawn({}, {
                fromBlock: 'latest',
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for fund withdrawals: ', error);
                } else {
                    updateEtherForOwner(this.owner);
                }
            });
            ethApplicationRegistrar.MembershipPurchased({}, {
                fromBlock: 'latest',
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for membership purchases: ', error);
                } else {
                    updateEtherForOwner(this.owner);
                }
            });
            this.onOwnerChanged((owner) => {
                updateEtherForOwner(owner);
            });
        });
    }

    startSingleApprovalWatches() {
        const singleApprovalEvents = [];
        SingleApproval.at(this.singleApproval).then((singleApproval) => {
            singleApproval.ApplicationSubmitted({}, {
                fromBlock: this.firstBlock,
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for events: ', error);
                } else {
                    pushBlockchainEvent(singleApprovalEvents, result, {type: 'ApplicationSubmitted', operation: 'ADD'});
                    sortBlockchainEvents(singleApprovalEvents);
                    this.setPendingApplications(reduceEventsToPendingApplications(singleApprovalEvents));
                }
            });
            singleApproval.ApplicationWithdrawn({}, {
                fromBlock: this.firstBlock,
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for events: ', error);
                } else {
                    pushBlockchainEvent(singleApprovalEvents, result, {
                        type: 'ApplicationWithdrawn',
                        operation: 'REMOVE'
                    });
                    sortBlockchainEvents(singleApprovalEvents);
                    this.setPendingApplications(reduceEventsToPendingApplications(singleApprovalEvents));
                }
            });
            singleApproval.ApplicationApproved({}, {
                fromBlock: this.firstBlock,
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for events: ', error);
                } else {
                    pushBlockchainEvent(singleApprovalEvents, result, {
                        type: 'ApplicationApproved',
                        operation: 'REMOVE'
                    });
                    sortBlockchainEvents(singleApprovalEvents);
                    this.setPendingApplications(reduceEventsToPendingApplications(singleApprovalEvents));
                }
            });
            singleApproval.ApplicationRejected({}, {
                fromBlock: this.firstBlock,
                toBlock: 'latest'
            }).watch((error, result) => {
                if (error) {
                    console.error('An error occurred while watching for events: ', error);
                } else {
                    pushBlockchainEvent(singleApprovalEvents, result, {
                        type: 'ApplicationRejected',
                        operation: 'REMOVE'
                    });
                    sortBlockchainEvents(singleApprovalEvents);
                    this.setPendingApplications(reduceEventsToPendingApplications(singleApprovalEvents));
                }
            });
        });
    }

    setOwner(owner) {
        this.owner = owner;
        this.fireOwnerChanged();
    }

    removeOwnerChangedListener(listener) {
        const index = this.onOwnerChangedListeners.indexOf(listener);
        if (index > -1) {
            this.onOwnerChangedListeners.splice(index, 1);
        }
    }

    onOwnerChanged(listener) {
        this.onOwnerChangedListeners.push(listener);
        listener(this.owner);
    }

    fireOwnerChanged() {
        this.onOwnerChangedListeners.forEach((listener) => {
            listener(this.owner);
        });
    }

    setEtherForOwner(etherForOwner) {
        this.etherForOwner = etherForOwner;
        this.fireEtherForOwnerChanged();
    }

    removeEtherForOwnerChangedListener(listener) {
        const index = this.onEtherForOwnerChangedListeners.indexOf(listener);
        if (index > -1) {
            this.onEtherForOwnerChangedListeners.splice(index, 1);
        }
    }

    onEtherForOwnerChanged(listener) {
        this.onEtherForOwnerChangedListeners.push(listener);
        listener(this.etherForOwner);
    }

    fireEtherForOwnerChanged() {
        this.onEtherForOwnerChangedListeners.forEach((listener) => {
            listener(this.etherForOwner);
        });
    }

    setPriceInEther(priceInEther) {
        this.priceInEther = priceInEther;
        this.firePriceInEtherChanged();
    }

    removePriceInEtherChangedListener(listener) {
        const index = this.onPriceInEtherChangedListeners.indexOf(listener);
        if (index > -1) {
            this.onPriceInEtherChangedListeners.splice(index, 1);
        }
    }

    onPriceInEtherChanged(listener) {
        this.onPriceInEtherChangedListeners.push(listener);
        listener(this.priceInEther);
    }

    firePriceInEtherChanged() {
        this.onPriceInEtherChangedListeners.forEach((listener) => {
            listener(this.priceInEther);
        });
    }

    setDurationInDays(durationInDays) {
        this.durationInDays = durationInDays;
        this.fireDurationInDaysChanged();
    }

    removeDurationInDaysChangedListener(listener) {
        const index = this.onDurationInDaysChangedListeners.indexOf(listener);
        if (index > -1) {
            this.onDurationInDaysChangedListeners.splice(index, 1);
        }
    }

    onDurationInDaysChanged(listener) {
        this.onDurationInDaysChangedListeners.push(listener);
        listener(this.durationInDays);
    }

    fireDurationInDaysChanged() {
        this.onDurationInDaysChangedListeners.forEach((listener) => {
            listener(this.durationInDays);
        });
    }

    firePendingApplicationsChanged() {
        this.onPendingApplicationsChangedListeners.forEach((listener) => {
            listener(this.pendingApplications);
        });
    }

    setPendingApplications(applications) {
        this.pendingApplications = applications;
        this.firePendingApplicationsChanged();
    }

    onPendingApplicationsChanged(listener) {
        this.onPendingApplicationsChangedListeners.push(listener);
        listener(this.pendingApplications);
    }

    removePendingApplicationsChangedListener(listener) {
        const index = this.onPendingApplicationsChangedListeners.indexOf(listener);
        if (index > -1) {
            this.onPendingApplicationsChangedListeners.splice(index, 1);
        }
    }

    approveApplication(source, applicant) {
        return SingleApproval.at(this.singleApproval).then((singleApproval) => {
            return singleApproval.approveApplication(source, applicant, 'N/A', {
                from: this.account,
                gas: '4000000'
            });
        });
    }

    withdrawOwnerFunds() {
        return EthApplicationRegistrar.at(this.ethApplicationRegistrar).then((ethApplicationRegistrar) => {
            return ethApplicationRegistrar.withdraw({
                from: this.owner,
                gas: '1000000'
            });
        });
    }

}

export default System;