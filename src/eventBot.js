const enemyUnitWrapper = document.querySelector(".enemy-unit-zone");
const enemyUnitsElements = [...enemyUnitWrapper.querySelectorAll(".trump-unit")];
const enemyUnitsWithStats = [];
const ownUnitWrapper = document.querySelector(".own-unit-zone");
const ownUnitsElements = [...ownUnitWrapper.querySelectorAll(".trump-unit")];
const ownUnitsWithStats = [];
const unitsWithStatsInOrder = [];
const getUnitsStats = (unitsElementsArray, unitsStatsArray, ownUnit) => {
    unitsElementsArray?.forEach((unitElement) => {
        const unitClasses = unitElement.querySelector(".trump-unit-portrait")?.classList;
        const unitClassName = [...unitClasses].find((className) => className.startsWith("look-"));
        const unitHealth = parseInt(unitElement.querySelector(".health").innerText);
        const unitAttackWrapper = unitElement.querySelector(".attack");
        const unitAttackMin = parseInt((unitAttackWrapper?.querySelector(".min")).innerText);
        const unitAttackMax = parseInt((unitAttackWrapper?.querySelector(".max")).innerText);
        const unitWithStats = {
            ownUnit: ownUnit,
            unitElement: unitElement,
            unitName: unitClassName,
            health: unitHealth,
            attackMin: unitAttackMin,
            attackMax: unitAttackMax,
            attackAvg: (unitAttackMax + unitAttackMin) / 2,
            groupAttack: 0,
        };
        unitsStatsArray.push(unitWithStats);
    });
    console.log(unitsStatsArray);
};
const getUnitsOrder = () => {
    const orderWrapper = document.querySelector(".turn-order");
    const unitsElementsInOrder = [...orderWrapper.querySelectorAll(".trump-unit-portrait")];
    const unitsInOrder = [];
    unitsElementsInOrder?.forEach((unitElement) => {
        const unitClassName = [...unitElement.classList].find((className) => className.startsWith("look-"));
        unitsInOrder.push(unitClassName);
    });
    const allUnits = [...enemyUnitsWithStats, ...ownUnitsWithStats];
    allUnits.sort((a, b) => {
        return unitsInOrder.indexOf(a.unitName) - unitsInOrder.indexOf(b.unitName);
    });
    unitsWithStatsInOrder.push(...allUnits);
};
const getGroupAttack = () => {
    let attackGroupSum = 0;
    let currentGroup = [];
    unitsWithStatsInOrder.forEach((unit, index) => {
        if (unit.ownUnit) {
            currentGroup.push(unit);
            attackGroupSum += unit.attackAvg;
        }
        if (!unit.ownUnit || index === unitsWithStatsInOrder.length - 1) {
            currentGroup.forEach((unit) => {
                unit.groupAttack = attackGroupSum;
            });
            currentGroup = [];
            attackGroupSum = 0;
        }
    });
};
const attackEnemy = () => {
    const strongestUnit = enemyUnitsWithStats.reduce((prevUnit, currentUnit) => {
        const parentElement = currentUnit.unitElement.parentElement;
        if (parentElement && parentElement.classList.contains("dead")) {
            return prevUnit;
        }
        return currentUnit.attackAvg > prevUnit.attackAvg ? currentUnit : prevUnit;
    });
    strongestUnit.unitElement.click();
    strongestUnit.unitElement = document.querySelector(`.${strongestUnit.unitName}`);
};
getUnitsStats(enemyUnitsElements, enemyUnitsWithStats, false);
getUnitsStats(ownUnitsElements, ownUnitsWithStats, true);
getUnitsOrder();
getGroupAttack();
attackEnemy();
export {};
