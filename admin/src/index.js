import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main.jsx';
import { Web3Provider } from 'react-web3';

// Render the main component into the dom
ReactDOM.render(<Web3Provider>
  <App />
</Web3Provider>, document.getElementById('app'));
