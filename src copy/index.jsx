import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const customTitlebar = window.require('custom-electron-titlebar');
 
window.titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#444'),
    shadow:true,
});

ReactDOM.render(<App />, document.getElementById('root'));

