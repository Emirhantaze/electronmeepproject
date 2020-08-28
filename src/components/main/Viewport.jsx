import React, { } from 'react'
import { useState } from 'react';
// const fs = window.require(`fs`)
// var _img = fs.readFileSync("/home/emirhantaze/test.svg").toString('base64');
const Viewport = () => {
  const eel = window.eel
  const [_img, _imgSetter] = useState("")

  return (

    <div style={{ maxWidth: "400px", float: "left" }}
    ><div onClick={() => {
      eel.show_plot()(data => _imgSetter(data))
    }}>change sim if simulation is done</div>
      <img src={`data:image/png;base64,${_img}`} alt="" /></div>
  );
};
export default Viewport;
