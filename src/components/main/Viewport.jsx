import React, { useState } from 'react'
import logo from './test.svg'
const { remote } = window.require('electron')
const fs = window.require(`fs`)
var _img = fs.readFileSync("/home/emirhantaze/test.svg").toString('base64');
const Viewport = (props) => {
    return (
        <div style={{ maxWidth: "400px", float: "left" }}
        ><img src={`data:image/svg+xml;base64,${_img}`} /></div>
    );
};
export default Viewport;
