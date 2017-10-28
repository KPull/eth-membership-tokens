import React from 'react';

import {Compiled} from "../Common/Contracts"
import {Button} from "reactstrap";
import {withdrawAll, getBalanceForAccount} from "./Withdrawal"

const loadCompiledContracts = function () {
  return new Promise(function (resolve, reject) {
    resolve(Compiled);
  });
};

function Result(props) {
  if (props.transaction) {
    return <div>
      <h4>Transaction Submitted</h4>
      <p>
        The transaction has been submitted. You can track when your transaction is mined into the blockchain here:
      </p>
      <p className="text-center">
        <a target="_blank" href={ "https://ropsten.etherscan.io/tx/" + props.transaction }>{props.transaction}</a>
      </p>
    </div>
  } else {
    return <div></div>;
  }
}

class EtherBalance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: '???'
    }
  }

  componentDidMount() {
    getBalanceForAccount(this.props.contract, this.props.account).then((balance) => {
      this.setState({
        balance: window.web3.fromWei(balance, 'ether') + ' ETH'
      });
    });
  }

  render() {
    return <span>{this.state.balance}</span>
  }

}

class WithdrawPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transaction: null,
      operation: null
    }
  }

  withdrawAll() {
    const operation = withdrawAll(this.props.system.contracts.purchaseUsingEther, this.props.account).then((transaction) => {
      this.setState({
        transaction: transaction,
        operation: null
      })
    });
    this.setState({
      transaction: null,
      operation: operation
    });
  }

  render() {
    return (
      <div>
        <h3>Withdraw</h3>
        <p>
          This page allows you to withdraw any funds collected from membership fees. Note that you are not able to withdraw funds for
          applications
          which are not yet approved.
        </p>
        <hr/>
        <h4>Withdraw Ether</h4>
        <p>
          Amount of ether available to {this.props.account}:
        </p>
        <p className="text-center">
          <strong><EtherBalance contract={this.props.system.contracts.purchaseUsingEther} account={this.props.account}/></strong>
        </p>
        <p className="text-center">
          <Button color="primary" onClick={() => this.withdrawAll()}>Withdraw All</Button>
        </p>
        <hr/>
        <Result transaction={this.state.transaction} />
      </div>
    )
  }
}

export {WithdrawPage}
