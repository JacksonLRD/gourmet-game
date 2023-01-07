import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 400,
    width: 600,
    // height: 130,
    // width: 285,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

let questionOneWindow: BrowserWindow = null;
console.log(questionOneWindow);

ipcMain.on("open-window-question-1", () => {
  console.log("ipc");
  if (questionOneWindow == null) {
    questionOneWindow = new BrowserWindow({
      height: 400,
      width: 600,
      // height: 130,
      // width: 285,
      alwaysOnTop: true,
      autoHideMenuBar: true,
      // frame: false,
    });
    questionOneWindow.on("closed", () => {
      questionOneWindow = null;
    });
  }
  questionOneWindow.loadFile(path.join(__dirname, "../question-one.html"));
});
