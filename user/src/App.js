import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Button,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Table
} from "reactstrap";
import {MembershipSystem} from "./MembershipSystem"

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
                <td>{price} ether</td>
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
                {this.props.defaultAccount}
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

function PurchaseMembershipSection({defaultAccount, accounts, onAccountChange, onPurchase}) {
    return <Col md="6">
        <h2>Purchase Membership</h2>
        <p>Choose an Ethereum account to use when paying the membership fee. If you're using MetaMask, you need to switch the account from
            within MetaMask itself.</p>
        <div className="text-center">
            <AccountsDropdown defaultAccount={defaultAccount} accounts={accounts} onAccountChange={onAccountChange}/>
            <br/>
            <Button color="primary" onClick={onPurchase}>
                Purchase Membership
            </Button>
        </div>
    </Col>
}

function PersonalDetailsSection({defaultAccount, personalDetailsUrl, onSubmit}) {
    return <Col md="6">
        <h2>Personal Details</h2>
        <p>Supply your personal details. These will be sent privately to <strong>{personalDetailsUrl}</strong> for the organisation
            administrators to approve your membership. To prove that you own the address sending the membership fee, you will be asked to
            sign the supplied details by your wallet.
        </p>
        <Form>
            <FormGroup>
                <Label for="fullName">Full name:</Label>
                <Input type="text" name="fullName" id="fullName"/>
            </FormGroup>
            <FormGroup>
                <Label for="email">E-mail:</Label>
                <Input type="text" name="email" id="email"/>
            </FormGroup>
            <Button color="primary" onClick={onSubmit}>
                Submit Personal Details
            </Button>
        </Form>
    </Col>
}

function SubscriptionForm(props) {
    return (
        <Row>
            <PurchaseMembershipSection defaultAccount={props.defaultAccount}
                                       accounts={props.accounts}
                                       onAccountChange={props.onAccountChange}
                                       onPurchase={props.onPurchase}/>
            <PersonalDetailsSection defaultAccount={props.defaultAccount}
                                    personalDetailsUrl={props.personalDetailsUrl}
                                    onSubmit={props.onSubmit}/>
        </Row>
    )
}

class App extends Component {

    constructor(props) {
        super(props);

        const system = MembershipSystem(window.web3, props.system);
        this.membershipSystem = system;

        this.state = {
            defaultAccount: '',
            accounts: [],
            price: '???',
            duration: '???'
        };
    }

    componentDidMount() {
        this.setState({
            price: this.membershipSystem.price(),
            duration: this.membershipSystem.duration(),
            accounts: this.membershipSystem.accounts(),
            defaultAccount: this.membershipSystem.defaultAccount(),
        });

        this.membershipSystem.onPriceChange((price) => {
            this.setState({
                price
            });
        });

        this.membershipSystem.onDurationChange((duration) => {
            this.setState({
                duration
            });
        });

        this.membershipSystem.onAccountsChanged((accounts) => {
            this.setState({
                accounts
            })
        });

        this.membershipSystem.onDefaultAccountChanged((defaultAccount) => {
            this.setState({
                defaultAccount
            })
        });
    }

    componentWillUnmount() {
        this.membershipSystem.disconnect();
    }

    render() {
        return (
            <Container>
                <Preamble system={this.membershipSystem.decoded()}
                          subscription={{price: this.state.price, duration: this.state.duration}}/>
                <SubscriptionForm defaultAccount={this.state.defaultAccount} accounts={this.state.accounts}
                                  personalDetailsUrl={"http://test.test/personalDetails"}
                                  onAccountChange={(account) => console.log('account:', account)}
                                  onPurchase={() => this.membershipSystem.startPurchase()}/>
            </Container>
        );
    }
}

export default App;
