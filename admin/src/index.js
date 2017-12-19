import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'
// Containers
import Full from './containers/Full/'

import System from './service/System'

const system = new System('eyJuYW1lIjoiYml0bWFsdGEiLCJleHBpcmluZ01lbWJlcnNoaXAiOiIweGViMTZhYzU0NDViMTMwM2E1NjU3ZTdlZDc2ZmFlNzRmNzI5ZjMwZjYiLCJzaW5nbGVBcHByb3ZhbCI6IjB4OTA1N2Y1ZGJjMTk2OGMwNWE3MjlhMTc1YTRjYmJlYmU4MGQ0NGFlMyIsImV0aEFwcGxpY2F0aW9uUmVnaXN0cmFyIjoiMHgwNTI3YWNlZDQxODAxNzQ5ODQxM2Q3NWU4MjZjMzEwNDc2ZjkyOGRlIiwiZmlyc3RCbG9jayI6IjI5In0=');
system.startWatches(null);

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route path="/" name="Home" component={() => {
                return <Full system={system}/>;
            }}/>
        </Switch>
    </HashRouter>
), document.getElementById('root'));
