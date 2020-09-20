import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import os from "os"
import * as Pty from 'node-pty'
const { remote } = window.require("electron")
const pty: typeof Pty = remote.require('node-pty')





ReactDOM.render(<App />, document.getElementById("root"));