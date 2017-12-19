import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import System from '../../views/System/';
import Applications from '../../views/Applications/';

class Full extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb/>
                        <Container fluid>
                            <Switch>
                                <Route path="/system" name="System" component={() => {
                                    return <System system={this.props.system}/>
                                }}/>
                                <Route path="/applications" name="Applications"
                                       component={() => {
                                           return <Applications system={this.props.system}/>
                                       }}/>
                                <Redirect from="/" to="/system"/>
                            </Switch>
                        </Container>
                    </main>
                    <Aside/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Full;
