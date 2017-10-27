require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import {Button, ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import { MembershipSystem } from "./Deploy"

class AppComponent extends React.Component {

  constructor(props, context) {
    super(props);

    this.toggle = this.toggle.bind(this);

    console.log('context web3: ', context.web3);
    this.state = {
      dropdownOpen: false,
      accounts: context.web3.accounts,
      selectedAccount: context.web3.selectedAccount
    };
  }

  switchAccount(account) {
    console.log('Switching default account to ' + account);
  }

  componentDidMount() {
    const self = this;
    this.web3 = window.web3;
    console.log('web3: ', this.web3);
  }

  deploy() {
    MembershipSystem('20000', '31557600');
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="index">
        <Container>
          <Row>
            <Col>
              <div className="text-right">
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    {this.state.selectedAccount}
                  </DropdownToggle>
                  <DropdownMenu> {
                    this.state.accounts.map((account) => {
                      return <DropdownItem>{account}</DropdownItem>
                    })
                  } </DropdownMenu>
                </ButtonDropdown>
              </div>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col md="3">
              <Nav vertical pills>
                <NavItem>
                  <NavLink href="#" active>Deploy</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Applications</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Withdraw</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Memberships</NavLink>
                </NavItem>
              </Nav>
              <hr/>
            </Col>
            <Col md="9">
              <h3>Deploy</h3>
              <p>
                This tool allows you to deploy a new Membership System of smart contracts onto the Ethereum platform.
                Notice, that this will send a number of transactions to deploy the necessary smart contracts <strong>which will
                cost ether</strong>. Make sure you <strong>review all transactions (and associated ether fees)</strong> before you submit
                them onto the network.
              </p>
              <p className="text-center">
                <Button onClick={this.deploy} color="primary">
                  Deploy New Membership System
                </Button>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

AppComponent.contextTypes = {
  web3: PropTypes.object
};

AppComponent.defaultProps = {};

export default AppComponent;
