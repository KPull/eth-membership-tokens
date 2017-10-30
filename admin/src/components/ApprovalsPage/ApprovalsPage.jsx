import React from 'react';
import {Compiled} from "../Common/Contracts"
import {Col, Container, Row} from "reactstrap";

class PendingApprovals extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      watch: null,
      openApplications: []
    }
  }

  componentDidMount() {
    const singleApproval = window.web3.eth.contract(Compiled['SingleApproval.sol:SingleApproval'].abi).at(this.props.system.contracts.approval);
    const applicationEvents = [];
    const pushAndSort = (event) => {
      applicationEvents.push(event);
      applicationEvents.sort((left, right) => {
        if (left.index0 < right.index0) {
          return -1;
        } else if (left.index0 > right.index0) {
          return 1;
        } else if (left.index1 < right.index1) {
          return -1;
        } else if (left.index1 > right.index1) {
          return 1;
        } else if (left.index2 < right.index2) {
          return -1;
        } else if (left.index2 > right.index2) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log('Events: ', applicationEvents);
      return applicationEvents.reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentValue.action === 'ADD') {
          return accumulator.concat([{
            key: currentValue.key,
            source: currentValue.source,
            applicant: currentValue.applicant
          }]);
        } else if (currentValue.action === 'REMOVE') {
          return accumulator.filter((application) => {
            return !(application.source === currentValue.source && application.applicant === currentValue.applicant)
          });
        }
      }, []);
    };

    const applicationSubmitted = singleApproval.ApplicationSubmitted({ }, { fromBlock: 1692149 }, (err, result) => {
      if (err) {
        console.log('Error occurred in Application submitted watch');
      } else if (!result.removed) {
        console.log('Received event ', result);
        this.setState({
          openApplications: pushAndSort({
            action: 'ADD',
            key: result.transactionHash,
            source: result.args.source,
            applicant: result.args.applicant,
            index0: result.blockNumber,
            index1: result.transactionIndex,
            index2: result.logIndex
          })
        });
      }
    });
    const applicationWithdrawn = singleApproval.ApplicationWithdrawn({ }, { fromBlock: 1692149 }, (err, result) => {
      if (err) {
        console.log('Error occurred in Application withdrawn watch');
      } else {
        console.log('Received event ', result);
        this.setState({
          openApplications: pushAndSort({
            action: 'REMOVE',
            key: result.transactionHash,
            source: result.args.source,
            applicant: result.args.applicant,
            index0: result.blockNumber,
            index1: result.transactionIndex,
            index2: result.logIndex
          })
        });
      }
    });
    const applicationRejected = singleApproval.ApplicationRejected({ }, { fromBlock: 1692149 }, (err, result) => {
      if (err) {
        console.log('Error occurred in Application rejected watch');
      } else {
        console.log('Received event ', result);
        this.setState({
          openApplications: pushAndSort({
            action: 'REMOVE',
            key: result.transactionHash,
            source: result.args.source,
            applicant: result.args.applicant,
            index0: result.blockNumber,
            index1: result.transactionIndex,
            index2: result.logIndex
          })
        });
      }
    });
    const applicationApproved = singleApproval.ApplicationApproved({ }, { fromBlock: 1692149 }, (err, result) => {
      if (err) {
        console.log('Error occurred in Application approved watch');
      } else {
        console.log('Received event ', result);
        this.setState({
          openApplications: pushAndSort({
            action: 'REMOVE',
            key: result.transactionHash,
            source: result.args.source,
            applicant: result.args.applicant,
            index0: result.blockNumber,
            index1: result.transactionIndex,
            index2: result.logIndex
          })
        });
      }
    });

    this.setState({
      watches: [ applicationSubmitted, applicationWithdrawn, applicationRejected, applicationApproved ]
    });
  }

  componentWillUnmount() {
    this.state.watches.forEach((watch) => watch.stopWatching());
  }

  render() {
    return <div>
      <Container>
      {
        this.state.openApplications.map((application) => {
          return <Row key={application.key}>
              <Col md="6">
                {application.applicant}
              </Col>
              <Col md="2">
                Actions
              </Col>
            </Row>
        })
      }
      </Container>
    </div>
  }

}

class ApprovalsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      system: null,
      operation: null
    }
  }

  render() {
    return <div>
      <h3>Applications</h3>
      <p>
        On this page you will find all pending applications for membership. Any applicants who you reject will have their fee refunded and
        will be able to collect it from the Membership DApp.
      </p>
      <hr/>
      <PendingApprovals system={this.props.system}/>
    </div>
  }

}

export default ApprovalsPage;
