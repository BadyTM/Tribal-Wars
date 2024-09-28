const enemyUnitWrapper = document.querySelector(".enemy-unit-zone");
const enemyUnitsElements = [...enemyUnitWrapper.querySelectorAll(".trump-unit")];
const enemyUnitsWithStats = [];
const ownUnitWrapper = document.querySelector(".own-unit-zone");
const ownUnitsElements = [...ownUnitWrapper.querySelectorAll(".trump-unit")];
const ownUnitsWithStats = [];
const unitsInOrder = [];
const getUnitsStats = (unitsElementsArray, unitsStatsArray) => {
    unitsElementsArray?.forEach((unitElement) => {
        const unitClasses = unitElement.querySelector(".trump-unit-portrait")?.classList;
        const unitClassName = [...unitClasses].find((className) => className.startsWith("look-"));
        const unitHealth = parseInt(unitElement.querySelector(".health").innerText);
        const unitAttackWrapper = unitElement.querySelector(".attack");
        const unitAttackMin = parseInt((unitAttackWrapper?.querySelector(".min")).innerText);
        const unitAttackMax = parseInt((unitAttackWrapper?.querySelector(".max")).innerText);
        const unitWithStats = {
            unitName: unitClassName,
            unitElement: unitElement,
            health: unitHealth,
            attackMin: unitAttackMin,
            attackMax: unitAttackMax,
            attackAvg: (unitAttackMax + unitAttackMin) / 2,
        };
        unitsStatsArray.push(unitWithStats);
    });
};
const getUnitsOrder = () => {
    const orderWrapper = document.querySelector(".turn-order");
    const unitsElementsInOrder = [...orderWrapper.querySelectorAll(".trump-unit-portrait")];
    unitsElementsInOrder?.forEach((unitElement) => {
        const unitClassName = [...unitElement.classList].find((className) => className.startsWith("look-"));
        unitsInOrder.push(unitClassName);
    });
    const allUnits = [...enemyUnitsWithStats, ...ownUnitsWithStats];
    allUnits.sort((a, b) => {
        return unitsInOrder.indexOf(a.unitName) - unitsInOrder.indexOf(b.unitName);
    });
    return allUnits;
};
getUnitsStats(enemyUnitsElements, enemyUnitsWithStats);
getUnitsStats(ownUnitsElements, ownUnitsWithStats);
console.log(getUnitsOrder());
export {};
