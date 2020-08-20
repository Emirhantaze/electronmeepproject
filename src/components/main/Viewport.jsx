import React, { } from 'react'
const fs = window.require(`fs`)
var _img = fs.readFileSync("/home/emirhantaze/test.svg").toString('base64');
const Viewport = () => {
    return (
        <div style={{ maxWidth: "400px", float: "left" }}
        ><img src={`data:image/svg+xml;base64,${_img}`} alt=""/></div>
    );
};
export default Viewport;
