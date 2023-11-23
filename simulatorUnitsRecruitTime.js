javascript: if (typeof recruitingTime === "undefined") {
  class recruitingTime {
    constructor() {
      this.scriptModal = document.createElement("div");
      this.attackUnits = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult"];
      this.defUnits = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult"];
      this.villageTrainUrl = "";
      this.init();
    }

    init = () => {
      this.createModal();
      this.getUnitValues(this.attackUnits, "att");
      this.getVillageTrainUrl();
      this.getUnitRecruitmentTime();
    };

    createModal = () => {
      this.scriptModal.setAttribute("id", "script-modal");
      this.scriptModal.style.position = "absolute";
      this.scriptModal.style.zIndex = "9999";
      this.scriptModal.style.backgroundColor = "#f4e4bc";
      this.scriptModal.style.border = "2px solid #603000";
      this.scriptModal.style.maxWidth = "90%";
      this.scriptModal.style.top = "35%";
      this.scriptModal.style.left = "50%";
      this.scriptModal.style.transform = "translate(-50%, -35%)";
      this.scriptModal.style.padding = "0.5rem";
      document.body.appendChild(this.scriptModal);
    };

    getUnitValues(unitArray, unitSide) {
      unitArray.forEach((unit) => {
        const unitSelector = document.querySelector(`[name="${unitSide}_${unit}"]`);
        if (unitSelector) {
          this.attackUnits[this.attackUnits.indexOf(unit)] = { unitType: unit, ammount: unitSelector.value ? unitSelector.value : 0 };
        } else {
          this.attackUnits[this.attackUnits.indexOf(unit)] = {};
        }
      });
    }

    getVillageTrainUrl() {
      const url = window.location.search.split("&")[0].match(/(\d+)/)[0];
      this.villageTrainUrl = `game.php?village=${url}&screen=train`;
    }

    getUnitRecruitmentTextInfo = async () => {
      try {
        const response = await fetch(this.villageTrainUrl);
        const data = await response.text();

        const htmlDocument = new DOMParser().parseFromString(data, "text/html");
        const script = htmlDocument.querySelector("#content_value > script");
        return script.textContent.replace(/\s/g, "");
      } catch (error) {
        throw new Error(`Error occurred: ${error}`);
      }
    };

    getUnitRecruitmentTime = async () => {
      const unitsText = await this.getUnitRecruitmentTextInfo();

      for (const unit of this.attackUnits) {
        if (unit) {
          const regex = new RegExp(`\\b${unit.unitType}\\b.*?\\bbuild_time\\b.*?(\\d+(\\.\\d+)?)`);
          const unitRecruitTime = unitsText.match(regex) ? unitsText.match(regex)[1] : "";
          const timeFormater = (time) => {
            return time > 9 ? time : "0" + time;
          };
          if (unitRecruitTime) {
            unit.recruitTime = unitRecruitTime;
            const totalTime = unit.ammount * unitRecruitTime;
            const days = Math.floor(totalTime / 86400);
            const hours = Math.floor((totalTime % 86400) / 3600);
            const minutes = Math.floor(((totalTime % 86400) % 3600) / 60);
            const seconds = Math.floor(((totalTime % 86400) % 3600) % 60);
            unit.totalRecruitTime = `${timeFormater(days)}:${timeFormater(hours)}:${timeFormater(minutes)}:${timeFormater(seconds)}`;
          } else {
            unit.recruitTime = "no info";
            unit.totalRecruitTime = "building missing";
          }
        }
      }
      this.fillModal();
    };

    fillModal = () => {
      this.scriptModal.innerHTML = `
    <div style="display: flex; width: 100%; flex-direction: row-reverse; margin-bottom: 0.5rem">
      <button onclick="document.querySelector('#script-modal').remove()">X</button>
    </div>
    <table class="script-modal-table"></table>`;

      for (const unit of this.attackUnits) {
        document.querySelector(".script-modal-table").innerHTML += `
      <tr style="font-size: medium">
      <td style="padding-right: 0.5rem">${unit.ammount}</td> 
      <td>${unit.unitType}:</td> 
      <td style="padding-left: 0.5rem">${unit.totalRecruitTime}</td></tr>`;
      }
    };
  }
  window.recruitingTime = recruitingTime;
}

if (!document.querySelector("#script-modal")) {
  new recruitingTime();
}
