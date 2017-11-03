import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Table} from "reactstrap";

function PreambleHeader({content}) {
    console.log('content: ', content);
    return <h1>{content}</h1>;
}

function PreambleText() {
    return <p>
        This application allows you to purchase or renew your membership. Membership is coordinated completely using
        smart contracts. The data below shows the current configuration of the membership smart contracts.
    </p>
}

function SystemInformation({contracts: {purchaseUsingEther, members, approval}, subscription: {price, duration}}) {
    return <div>
        <h2>Subscription Details</h2>
        <Table>
            <tbody>
            <tr>
                <td>Ether Payment Smart Contract Address</td>
                <td>{purchaseUsingEther}</td>
            </tr>
            <tr>
                <td>Membership Smart Contract Address</td>
                <td>{members}</td>
            </tr>
            <tr>
                <td>Approval Smart Contract Address</td>
                <td>{approval}</td>
            </tr>
            <tr>
                <td>Membership Price</td>
                <td>{price}</td>
            </tr>
            <tr>
                <td>Membership Length</td>
                <td>{duration}</td>
            </tr>
            </tbody>
        </Table>
    </div>
}

function Preamble({system: {name, contracts}, subscription}) {
    return (
        <Row>
            <Col xs="12">
                <PreambleHeader content={name}/>
                <PreambleText/>
                <SystemInformation contracts={contracts} subscription={subscription}/>
            </Col>
        </Row>
    );
}

class AccountsDropdown extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
                {this.props.coinbase}
            </DropdownToggle>
            <DropdownMenu> {
                this.props.accounts.map(account => {
                    return <DropdownItem key={account} onClick={() => {
                        this.props.onAccountChange(account)
                    }}>{account}</DropdownItem>
                })
            }
            </DropdownMenu>
        </Dropdown>
    }
}

function PurchaseMembershipSection({coinbase, accounts, onAccountChange, onPurchase}) {
    return <Col md="6">
        <h2>Purchase Membership</h2>
        <p>Choose an Ethereum account to use when paying the membership fee. If you're using MetaMask, you need to switch the account from
            within MetaMask itself.</p>
        <div className="text-center">
            <AccountsDropdown coinbase={coinbase} accounts={accounts} onAccountChange={onAccountChange}/>
            <br/>
            <Button color="primary" onClick={onPurchase}>
                Purchase Membership
            </Button>
        </div>
    </Col>
}

function SubscriptionForm(props) {
    return (
        <Row>
            <PurchaseMembershipSection coinbase={props.coinbase}
                                       accounts={props.accounts}
                                       onAccountChange={props.onAccountChange}
                                       onPurchase={props.onPurchase}/>
            <Col md="6">
                <h2>Personal Details</h2>
            </Col>
        </Row>
    )
}

class App extends Component {
    render() {
        return (
            <Container>
                <Preamble system={
                    JSON.parse(atob('eyJuYW1lIjoiQml0bWFsdGEiLCJvd25lciI6IjB4OTRmMWUxOTg1NTEwYTc2YmMzZDUyY2MwODZiOTRhYzdhOTEwYWY4OSIsIm5ldHdvcmsiOiIzIiwiY29udHJhY3RzIjp7Im1lbWJlcnMiOiIweGY3NmM2ZGIzOWE2MjYwY2EwMzliMGYyOGVjZTM4MzQ1MmM0NTIyZTQiLCJhcHByb3ZhbCI6IjB4NTNBMDhjNDgyMGRjNTI4NDg1RTRGZjg3NGQzQjRGQzM2MDMxNjJiOCIsInB1cmNoYXNlVXNpbmdFdGhlciI6IjB4NTRmNEE4QzUwMDM1NUE3ZjhGMDk1N0EwOEQ4Mjg0RDlGOTBCM2U3OCJ9LCJwZXJzb25hbERldGFpbHNVcmwiOiJodHRwOi8vdGVzdC50ZXN0L3BlcnNvbmFsRGV0YWlscyJ9'))
                } subscription={{price: '0.01 ether', duration: '1 year'}}/>
                <SubscriptionForm coinbase={'0x123456789abcdef'} accounts={['0x123456789abcdef', '0x123456789fedcba']}
                                  onAccountChange={(account) => console.log('account:', account)}
                                  onPurchase={() => console.log('purchase')}/>
            </Container>
        );
    }
}

export default App;
