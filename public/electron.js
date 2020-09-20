// Modules to control application life and create native browser window
const os = require("os")
const pty = require("node-pty")
const fp = require("find-free-port")
const { app, BrowserWindow, screen } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs")

let mainWindow, loadingWindow;
async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    frame: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });
  let port = await main()
  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      if (frameName === "modal") {
        // pencereyi modal olarak aç
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          width: 100,
          height: 100,
        });
        event.newGuest = new BrowserWindow(options);
      }
    }
  );
  // and load the index.html of the app.
  orginal_file = fs.readFileSync(`${__dirname}/index.html`, { encoding: 'utf8', flag: 'r' })
  fs.writeFileSync(`${__dirname}/index_temp.html`, orginal_file.replace(/mappedportfromjs/g, port.toString()))
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./index_temp.html"),
      protocol: "file:",
      slashes: true,
    });


  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.on("did-finish-load", () => {

    loadingWindow.close()
    mainWindow.show()
  })
}


const creatLoadingScreen = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  loadingWindow = new BrowserWindow({
    width: parseInt(width / 3),
    height: parseInt(height / 1.5),
    resizable: false,
    frame: false,
    show: true,
    webPreferences: {
      enableRemoteModule: true
    },
  })

  const startUrl = path.join(__dirname, "loading", "index.html")
  console.log(startUrl)
  loadingWindow.loadFile(startUrl);

}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const main = async () => {
  var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
  var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: "./",
  });
  let waitpythonresolve
  let test = new Promise((resolve, reject) => { waitpythonresolve = resolve })
  port = await fp(8080)
  port = port[0]
  let splitteddirname = __dirname.split("/");
  let flag = true
  for (let i = 0; i < splitteddirname.length; i++) {
    if (splitteddirname[i] === "app.asar")
      flag = false
  }
  if (!flag)
    ptyProcess.write(`cd ${path.join(__dirname, "..", "..", "..")} \r`)
  ptyProcess.write(`conda activate mp_test \r python python_src/run.py ${port}\r`)
  ptyProcess.on("data", (data) => {
    console.log(data);
    if (data === "started\r\n") {
      waitpythonresolve(port)
    }
  })
  return test
}



app.whenReady().then(() => {
  creatLoadingScreen();
  createWindow()
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});