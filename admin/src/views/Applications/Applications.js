import React, {Component} from 'react';

class Applications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pendingApplications: []
        };
    }

    componentWillMount() {
        this.listener = (pendingApplications) => {
            this.setState({
                pendingApplications
            });
        };
        this.props.system.onPendingApplicationsChanged(this.listener);
    }

    componentWillUnmount() {
        this.props.system.removePendingApplicationsChangedListener(this.listener);
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col">
                        <div className="alert alert-light" role="alert">
                            Single Approval smart contract deployed at:
                            <pre>{this.props.system.singleApproval}</pre>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Transaction</th>
                                <th>Applicant</th>
                                <th>Source</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>{
                                this.state.pendingApplications.map((application) => {
                                    return <tr key={application.transactionHash}>
                                        <td>{application.transactionHash}</td>
                                        <td>{application.applicant}</td>
                                        <td>{application.source}</td>
                                        <td>
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => this.props.system.approveApplication(application.source, application.applicant)}>
                                                <i className="fa fa-check"/>
                                            </button>
                                            <button type="button" className="btn btn-danger">
                                                <i className="fa fa-times"/>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default Applications;