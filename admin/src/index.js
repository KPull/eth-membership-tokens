import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main.jsx';
import Web3 from 'web3';
import { Web3Provider } from 'react-web3';

if (typeof (web3) === 'undefined') {
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
} else {
  console.log('web3 defined');
}

// Render the main component into the dom
ReactDOM.render(<Web3Provider>
  <App />
</Web3Provider>, document.getElementById('app'));
