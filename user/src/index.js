import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App
    system={'eyJuYW1lIjoiQml0bWFsdGEiLCJvd25lciI6IjB4OTRmMWUxOTg1NTEwYTc2YmMzZDUyY2MwODZiOTRhYzdhOTEwYWY4OSIsIm5ldHdvcmsiOiIzIiwiY29udHJhY3RzIjp7Im1lbWJlcnMiOiIweGY3NmM2ZGIzOWE2MjYwY2EwMzliMGYyOGVjZTM4MzQ1MmM0NTIyZTQiLCJhcHByb3ZhbCI6IjB4NTNBMDhjNDgyMGRjNTI4NDg1RTRGZjg3NGQzQjRGQzM2MDMxNjJiOCIsInB1cmNoYXNlVXNpbmdFdGhlciI6IjB4NTRmNEE4QzUwMDM1NUE3ZjhGMDk1N0EwOEQ4Mjg0RDlGOTBCM2U3OCJ9LCJwZXJzb25hbERldGFpbHNVcmwiOiJodHRwOi8vdGVzdC50ZXN0L3BlcnNvbmFsRGV0YWlscyJ9'}
    web3={ window.web3 }
/>, document.getElementById('root'));
registerServiceWorker();
