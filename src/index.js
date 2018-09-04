import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SnapshotExample } from './stateTreeSnapshot';
import { AsPatchComponent }  from './json-patch';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<SnapshotExample />, document.getElementById('root'));
ReactDOM.render(<AsPatchComponent />, document.getElementById('root'));
registerServiceWorker();
