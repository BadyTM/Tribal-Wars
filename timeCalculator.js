javascript:
if (typeof timeCalculatorModal === "undefined") {
  class timeCalculatorModal {
    constructor() {
      this.scriptModal = document.createElement("div");
      this.createModal();
      this.fillModal();
      this.scriptModal.querySelector("#calculate-btn").addEventListener("click", () => {
        this.timeCalculator();
      });
    }

    createModal = () => {
      this.scriptModal.setAttribute("id", "script-modal");
      this.scriptModal.style.position = "absolute";
      this.scriptModal.style.zIndex = "9999";
      this.scriptModal.style.display = "flex";
      this.scriptModal.style.flexWrap = "wrap";
      this.scriptModal.style.backgroundColor = "#f4e4bc";
      this.scriptModal.style.border = "2px solid #603000";
      this.scriptModal.style.maxWidth = "90%";
      this.scriptModal.style.top = "35%";
      this.scriptModal.style.left = "50%";
      this.scriptModal.style.transform = "translate(-50%, -35%)";
      this.scriptModal.style.padding = "0.5rem";
      document.body.appendChild(this.scriptModal);
    };

    timeCalculator = () => {
      const timeHolder = document.querySelector("#time-holder");
      const hours = document.querySelector("#script-hours");
      const minutes = document.querySelector("#script-minutes");
      const seconds = document.querySelector("#script-seconds");

      const hoursValue = hours.value ? parseInt(hours.value) : 0;
      const minutesValue = minutes.value ? parseInt(minutes.value) : 0;
      const secondsValue = seconds.value ? parseInt(seconds.value) : 0;

      const secondsTotal = hoursValue * 3600 + minutesValue * 60 + secondsValue;
      const secondsDivided = secondsTotal / 2;

      const dividedHours = Math.floor(secondsDivided / 3600);
      const dividedMinutes = Math.floor((secondsDivided % 3600) / 60);
      const dividedSeconds = (secondsDivided % 3600) % 60;
      timeHolder.innerText = `${dividedHours > 9 ? dividedHours : "0" + dividedHours}:${
        dividedMinutes > 9 ? dividedMinutes : "0" + dividedMinutes
      }:${dividedSeconds > 9 ? dividedSeconds : "0" + dividedSeconds}`;
    };

    fillModal = () => {
      this.scriptModal.innerHTML = `
      <div style="flex-basis: 100%; display: flex; flex-direction: row-reverse">
        <button style="height: 2rem; width: 2rem" onclick="document.querySelector('#script-modal').remove()">X</button>
      </div>
      <div style="width: 100%; display: flex; justify-content: center">
        <div style="display: flex; flex-direction: column; max-width: 33%">
          <label for="script-hours">Hours:</label>
          <input id="script-hours" type="number" style="height: 1.5rem; border: 0.5px solid black" />
        </div>
        <div style="display: flex; flex-direction: column; max-width: 33%; margin: 0 0.5%">
          <label for="script-minutes">Minutes:</label>
          <input id="script-minutes" type="number" style="height: 1.5rem; border: 0.5px solid black" />
        </div>
        <div style="display: flex; flex-direction: column; max-width: 33%">
          <label for="script-seconds">Seconds:</label>
          <input id="script-seconds" type="number" style="height: 1.5rem; border: 0.5px solid black" />
        </div>
      </div>
      <div style="flex-basis: 100%; display: flex; justify-content: center; margin-top: 0.5rem">
        <button style="height: 2rem" id="calculate-btn">Calculate</button>
      </div>
      <div style="flex-basis: 100%; display: flex; justify-content: center; margin-top: 0.5rem">
        <div
          id="time-holder"
          style="border: 2px solid #603000; min-height: 2rem; line-height: 2rem; min-width: 35%; font-size: x-large; text-align: center"
        ></div>
      </div>`;
    };
  }

  window.timeCalculatorModal = timeCalculatorModal;
}
if (!document.querySelector("#script-modal")) {
  new timeCalculatorModal();
}
