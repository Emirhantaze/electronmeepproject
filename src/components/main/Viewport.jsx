import React, { } from 'react'
import { useState } from 'react';
import { eel } from '../../eelconfig';
// const fs = window.require(`fs`)
// var _img = fs.readFileSync("/home/emirhantaze/test.svg").toString('base64');
let html = ""
const Viewport = () => {

  const [_img, _imgSetter] = useState(html)

  return (

    <div style={{ float: "left", width: "700px", overflowX: "scroll" }}
    ><div onClick={() => {
      let startTime = new Date()
      eel.show_plot()(data => {
        console.log(`elapsed = ${new Date() - startTime}`)
        return _imgSetter(data)
      })
    }}>change sim if simulation is done</div>
      <img src={`data:image/png;base64,${_img}`} alt="" />
    </div>
  );
};
export default Viewport;
