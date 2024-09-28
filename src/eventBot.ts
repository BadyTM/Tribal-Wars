const enemyUnitZone = document.querySelector(".enemy-unit-zone") as HTMLElement;
const enemyUnitsElements = [...enemyUnitZone.querySelectorAll(".trump-unit")] as HTMLElement[];
const enemyUnits: Record<string, number | HTMLElement>[] = [];

const ownUnitZone = document.querySelector(".own-unit-zone") as HTMLElement;
const ownUnitsElements = [...ownUnitZone.querySelectorAll(".trump-unit")] as HTMLElement[];
const ownUnits: Record<string, number>[] = [];

const getUnitsStats = (unitsElementsArray: HTMLElement[], unitsStatsArray: object[]) => {
  unitsElementsArray?.forEach((unit: HTMLElement): void => {
    const health = parseInt((unit.querySelector(".health") as HTMLElement).innerText);
    const attackWrapper = unit.querySelector(".attack");
    const attackMin = parseInt((attackWrapper?.querySelector(".min") as HTMLElement).innerText);
    const attackMax = parseInt((attackWrapper?.querySelector(".max") as HTMLElement).innerText);
    const unitWithStats = {
      unitElement: unit,
      health: health,
      attackMin: attackMin,
      attackMax: attackMax,
    };

    unitsStatsArray.push(unitWithStats);
  });
  console.log(unitsStatsArray);
};

getUnitsStats(enemyUnitsElements, enemyUnits);
getUnitsStats(ownUnitsElements, ownUnits);
