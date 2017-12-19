import React, {Component} from 'react';

class System extends Component {

    constructor(props) {
        super(props);

        this.state = {
            priceInEther: '0',
            durationInDays: '0',
            owner: '0x',
            numberOfPendingApplications: 0,
            etherForOwner: '0'
        }
    }

    componentWillMount() {
        this.ownerListener = (owner) => {
            this.setState({
                owner
            });
        };
        this.priceInEtherListener = (priceInEther) => {
            this.setState({
                priceInEther
            });
        };
        this.durationInDaysListener = (durationInDays) => {
            this.setState({
                durationInDays
            });
        };
        this.pendingApplicationsListener = (pendingApplications) => {
            this.setState({
                numberOfPendingApplications: pendingApplications.length
            });
        };
        this.etherForOwnerListener = (etherForOwner) => {
            this.setState({
                etherForOwner
            });
        };

        this.props.system.onOwnerChanged(this.ownerListener);
        this.props.system.onPriceInEtherChanged(this.priceInEtherListener);
        this.props.system.onDurationInDaysChanged(this.durationInDaysListener);
        this.props.system.onPendingApplicationsChanged(this.pendingApplicationsListener);
        this.props.system.onEtherForOwnerChanged(this.etherForOwnerListener);
    }

    componentWillUnmount() {
        this.props.system.removeOwnerChangedListener(this.ownerListener);
        this.props.system.removePriceInEtherChangedListener(this.priceInEtherListener);
        this.props.system.removeDurationInDaysChangedListener(this.durationInDaysListener);
        this.props.system.removePendingApplicationsChangedListener(this.pendingApplicationsListener);
        this.props.system.removeEtherForOwnerChangedListener(this.etherForOwnerListener);
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th colSpan="2">System Code</th>
                            </tr>
                            <tr>
                                <td style={{
                                    wordBreak: 'break-all',
                                    fontFamily: 'monospace'
                                }}>{this.props.system.code}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th colSpan="2">Deployed Smart Contracts</th>
                            </tr>
                            <tr>
                                <th>Main Membership Smart Contract</th>
                                <td>{this.props.system.expiringMembership}</td>
                            </tr>
                            <tr>
                                <th>Membership By Ether Smart Contract</th>
                                <td>{this.props.system.ethApplicationRegistrar}</td>
                            </tr>
                            <tr>
                                <th>Pending Applications Smart Contract</th>
                                <td>{this.props.system.singleApproval}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th colSpan="2">Membership by Ether Details</th>
                            </tr>
                            <tr>
                                <th>Owner</th>
                                <td>{this.state.owner}</td>
                            </tr>
                            <tr>
                                <th>Ether Membership Price</th>
                                <td>{this.state.priceInEther} ether</td>
                            </tr>
                            <tr>
                                <th>Ether Membership Duration</th>
                                <td>{this.state.durationInDays} days</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th colSpan="2">Pending Applications</th>
                            </tr>
                            <tr>
                                <th>Number of Pending Applications</th>
                                <td>{this.state.numberOfPendingApplications}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th colSpan="3">Collected Funds</th>
                            </tr>
                            <tr>
                                <th>Ether to Withdraw</th>
                                <td>{this.state.etherForOwner} ether</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => this.props.system.withdrawOwnerFunds()}>
                                        <i className="fa fa-fixed fa-money"></i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default System;
