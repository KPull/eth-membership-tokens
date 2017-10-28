require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import DeployPage from './DeployPage/DeployPage';
import {ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row} from 'reactstrap';
import PropTypes from 'prop-types';

class AppComponent extends React.Component {

  constructor(props, context) {
    super(props);

    this.toggle = this.toggle.bind(this);

    console.log('context web3: ', context.web3);
    this.state = {
      dropdownOpen: false,
      accounts: context.web3.accounts,
      selectedAccount: context.web3.selectedAccount,
      deployResult: null,
      organization: null,
      operation: null
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
              <DeployPage onDeploy={() => {
                console.log(arguments)
              }}/>
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
