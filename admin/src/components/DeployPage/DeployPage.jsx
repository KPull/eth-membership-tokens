import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {MembershipSystem} from "./Deploy";
import {Label} from "reactstrap/dist/reactstrap.full.min";

export function SystemCode(props) {
  const encoded = window.btoa(JSON.stringify(props.system));
  return (
    <Input type="textarea" rows="6">{encoded}</Input>
  );
};

function DeploymentResult(props) {
  if (props.system) {
    return <div>
      <h3>Deployment Result</h3>
      <p>The system has been deployed successfully.</p>
      <h4>System Code</h4>
      <p>The code below contains the smart contract addresses necessary for interacting
        with the system. Users must supply this code to the membership registration DApp.</p>
      <p><SystemCode system={props.system}/></p>
      <h4>Smart Contracts</h4>
      <p>The following smart contracts have been deployed to the blockchain</p>
      <ul>
        <li>Membership contract: <a target="_blank"
                                    href={"https://ropsten.etherscan.io/address/" + props.system.contracts.members}>{props.system.contracts.members}</a>
        </li>
        <li>Approval contract: <a target="_blank"
                                  href={"https://ropsten.etherscan.io/address/" + props.system.contracts.approval}>{props.system.contracts.approval}</a>
        </li>
        <li>Ether payment contract: <a target="_blank"
                                       href={"https://ropsten.etherscan.io/address/" + props.system.contracts.purchaseUsingEther}>{props.system.contracts.purchaseUsingEther}</a>
        </li>
      </ul>
    </div>
  } else {
    return <div/>
  }
}

class DeployPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      system: null,
      operation: null
    }
  }

  deploy() {
    const operation = MembershipSystem('20000', '31557600', 'http://test.test/personalDetails').then((system) => {
      this.setState({
        system: system,
        operation: null
      });
      this.props.onDeploy(system);
    });
    this.setState({
      system: null,
      operation: operation
    });
  }

  render() {
    return <div>
      <h3>Deploy</h3>
      <p>
        This tool allows you to deploy a new Membership System of smart contracts onto the Ethereum platform.
        Notice, that this will send a number of transactions to deploy the necessary smart contracts <strong>which will
        cost ether</strong>. Make sure you <strong>review all transactions (and associated ether fees)</strong> before you submit
        them onto the network.
      </p>
      <hr/>
      <Form>
        <FormGroup>
          <Label for="systemName">System Name</Label>
          <Input name="systemName" id="systemName"/>
        </FormGroup>
        <FormGroup>
          <Label for="price">Price (in wei)</Label>
          <Input type="number" name="price" id="price"/>
        </FormGroup>
        <FormGroup>
          <Label for="duration">Duration (in seconds)</Label>
          <Input type="number" name="duration" id="duration"/>
        </FormGroup>
        <FormGroup>
          <Label for="personalDetailsUrl">Personal Details URL</Label>
          <Input name="personalDetailsUrl" id="PersonalDetailsUrl"/>
        </FormGroup>
        <Button onClick={(() => this.deploy())} color="primary">Deploy Membership System</Button>
      </Form>
      <hr/>
      <DeploymentResult system={this.state.system}/>
    </div>
  }

}

export default DeployPage;
