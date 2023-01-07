import { ipcRenderer } from "electron";

const linkButtonOk = document.querySelector(".button-ok");

linkButtonOk.addEventListener("click", function () {
  ipcRenderer.send("open-window-question-1");
});
