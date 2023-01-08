import { ipcRenderer } from "electron";

const linkButtonOk = document.querySelector(".button-ok");
const firstQuestionButtonSim = document.querySelector(".button-sim-q1");

linkButtonOk.addEventListener("click", function () {
  ipcRenderer.send("open-window-question-1");
});

firstQuestionButtonSim.addEventListener("click", function () {
  document.getElementById(".qq").innerHTML = "Teste";
});
