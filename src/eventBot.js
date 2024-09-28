const enemyUnitZone = document.querySelector(".enemy-unit-zone");
const enemyUnitsElements = [...enemyUnitZone.querySelectorAll(".trump-unit")];
const enemyUnits = [];
const ownUnitZone = document.querySelector(".own-unit-zone");
const ownUnitsElements = [...ownUnitZone.querySelectorAll(".trump-unit")];
const ownUnits = [];
const getUnitsStats = (unitsElementsArray, unitsStatsArray) => {
    unitsElementsArray?.forEach((unit) => {
        const health = parseInt(unit.querySelector(".health").innerText);
        const attackWrapper = unit.querySelector(".attack");
        const attackMin = parseInt((attackWrapper?.querySelector(".min")).innerText);
        const attackMax = parseInt((attackWrapper?.querySelector(".max")).innerText);
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
export {};
