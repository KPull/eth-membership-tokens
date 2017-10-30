import {WithdrawPage} from "./WithdrawPage/WithdrawPage";

require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import DeployPage from './DeployPage/DeployPage';
import {ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import ApprovalsPage from "./ApprovalsPage/ApprovalsPage";

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
              {/*<DeployPage onDeploy={() => {*/}
                {/*console.log(arguments)*/}
              {/*}}/>*/}
              {/*<WithdrawPage system={*/}
                {/*JSON.parse(atob('eyJvd25lciI6IjB4OTRmMWUxOTg1NTEwYTc2YmMzZDUyY2MwODZiOTRhYzdhOTEwYWY4OSIsIm5ldHdvcmsiOiIzIiwiY29udHJhY3RzIjp7Im1lbWJlcnMiOiIweGE4MWI3Nzc2NmVkN2UyOTlmZmU1ZTRjMDU2MGU0N2QzZjAwM2I4N2EiLCJhcHByb3ZhbCI6IjB4OTBjNzZjMjlmNmM5NGQ0ZThjZGY2MzI5YTVkY2Q1ODY0Mzg2MWEyNiIsInB1cmNoYXNlVXNpbmdFdGhlciI6IjB4ZmEwMGIwZDFmYzM1NmFjYmNjZWQzY2EyNDcyZmQ0ZTlkZDEzYjg5OCJ9LCJwZXJzb25hbERldGFpbHNVcmwiOiJodHRwOi8vdGVzdC50ZXN0L3BlcnNvbmFsRGV0YWlscyJ9'))*/}
              {/*} account={this.state.selectedAccount} />*/}
              <ApprovalsPage system={
                JSON.parse(atob('eyJvd25lciI6IjB4OTRmMWUxOTg1NTEwYTc2YmMzZDUyY2MwODZiOTRhYzdhOTEwYWY4OSIsIm5ldHdvcmsiOiIzIiwiY29udHJhY3RzIjp7Im1lbWJlcnMiOiIweGY3NmM2ZGIzOWE2MjYwY2EwMzliMGYyOGVjZTM4MzQ1MmM0NTIyZTQiLCJhcHByb3ZhbCI6IjB4NTNBMDhjNDgyMGRjNTI4NDg1RTRGZjg3NGQzQjRGQzM2MDMxNjJiOCIsInB1cmNoYXNlVXNpbmdFdGhlciI6IjB4NTRmNEE4QzUwMDM1NUE3ZjhGMDk1N0EwOEQ4Mjg0RDlGOTBCM2U3OCJ9LCJwZXJzb25hbERldGFpbHNVcmwiOiJodHRwOi8vdGVzdC50ZXN0L3BlcnNvbmFsRGV0YWlscyJ9'))
              } />
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
