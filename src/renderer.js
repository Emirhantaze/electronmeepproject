let pty  = window.require("node-pty")

var os = window.require('os');


var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {

    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: window.process.env.HOME,
    env: window.process.env
});
window.ptyProcess = ptyProcess;

/*
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
window.ptyProcess = pty.spawn("bash.exe", [], {
    name: 'xterm-color',
    cols: 80,
    rows: 0,
    cwd: window.process.cwd(),
    env: window.process.env
});
window.ptyProcess.write("conda activate mp\r")
window.ptyProcess.write("cd /mnt/c/test\r")
window.ptyProcess.write("python test.py\r")
*/
// Initialize xterm.js and attach it to the DOM

