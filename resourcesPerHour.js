if (typeof allResourcesModal === "undefined") {
  class allResourcesModal {
    constructor() {
      this.scriptModal = document.createElement("div");
      this.playerInfoUrl = "/game.php?screen=info_player";
      this.villagesUrls = [];
      this.villageResponses = [];
      this.parser = new DOMParser();
      this.info = {
        woodPerHour: 0,
        stonePerHour: 0,
        ironPerHour: 0,
        woodAll: 0,
        stoneAll: 0,
        ironAll: 0,
      };
      this.init();
    }

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

    getVillagesUrls = async () => {
      try {
        const response = await fetch(this.playerInfoUrl);
        const data = await response.text();
        const htmlDocument = this.parser.parseFromString(data, "text/html");
        let villageList = htmlDocument.querySelectorAll(".village_anchor");

        if (villageList.length) {
          villageList.forEach((village) => {
            const villageId = village.getAttribute("data-id");
            this.villagesUrls.push(`/game.php?village=n${villageId}&screen=overview`);
          });
        } else {
          villageList = document.querySelectorAll("#villages_list > div > a");
          villageList.forEach((village) => {
            const villageId = village.getAttribute("href").split("id=");
            this.villagesUrls.push(`/game.php?village=n${villageId[1]}&screen=overview`);
          });
        }
      } catch (error) {
        throw new Error(`Error occurred: ${error}`);
      }
    };

    getVillagesData = async () => {
      try {
        this.villageResponses.push(
          await Promise.all(
            this.villagesUrls.map(async (villageUrl) => {
              const response = await fetch(villageUrl);
              return response.text();
            })
          )
        );
      } catch (error) {
        throw new Error(`Error occurred: ${error}`);
      }
    };

    getResources = async () => {
      await this.getVillagesUrls();
      await this.getVillagesData();
      this.villageResponses.forEach((response) => {
        const numberRegex = /\d+/g;
        const htmlDocument = this.parser.parseFromString(response, "text/html");
        const resources = htmlDocument.querySelectorAll("#wood, #stone, #iron");

        resources.forEach((resource) => {
          const resourceName = resource.getAttribute("id");
          const resourceHourNumber = parseInt(resource.getAttribute("title").match(numberRegex));
          let resourceNumber = parseInt(resource.textContent);

          if (!resourceNumber) {
            resourceNumber = parseInt(resource.getAttribute("data-amount"));
          }

          if (resourceName === "wood") {
            this.info.woodPerHour += resourceHourNumber;
            this.info.woodAll += resourceNumber;
          } else if (resourceName === "stone") {
            this.info.stonePerHour += resourceHourNumber;
            this.info.stoneAll += resourceNumber;
          } else {
            this.info.ironPerHour += resourceHourNumber;
            this.info.ironAll += resourceNumber;
          }
        });
      });
    };

    addDotsToNumber = (number) => {
      let modified = number.toString();
      for (let i = 3; i < modified.length; i += 4) {
        modified = modified.slice(0, modified.length - i) + "." + modified.slice(modified.length - i);
      }
      return modified;
    };

    fillModal = () => {
      this.scriptModal.innerHTML = `
      <div style="display: flex; width: 100%; flex-direction: row-reverse; margin-bottom: 0.5rem">
      <button onclick="document.querySelector('#script-modal').remove()">X</button>
      </div>
      <div style="font-size: medium">wood per hour: ${this.addDotsToNumber(this.info.woodPerHour)}</div>
      <div style="font-size: medium">stone per hour: ${this.addDotsToNumber(this.info.stonePerHour)}</div>
      <div style="font-size: medium; margin-bottom: 0.5rem">iron per hour: ${this.addDotsToNumber(this.info.ironPerHour)}</div>
      <div style="font-size: medium">wood totally: ${this.addDotsToNumber(this.info.woodAll)}</div>
      <div style="font-size: medium">stone totally: ${this.addDotsToNumber(this.info.stoneAll)}</div>
      <div style="font-size: medium">iron totally: ${this.addDotsToNumber(this.info.ironAll)}</div>`;
    };

    init = async () => {
      this.createModal();
      await this.getResources();
      this.fillModal();
    };
  }

  window.allResourcesModal = allResourcesModal;
}
if (!document.querySelector("#script-modal")) {
  new allResourcesModal();
}
