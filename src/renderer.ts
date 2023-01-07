import { ipcRenderer } from "electron";

const linkOk = document.querySelector("#button-ok");

linkOk.addEventListener("click", function () {
  console.log("cliquei");
  ipcRenderer.send("open-window-question-1");
});
