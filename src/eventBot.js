const enemyUnitWrapper = document.querySelector(".enemy-unit-zone");
const enemyUnitsElements = [...enemyUnitWrapper.querySelectorAll(".trump-unit")];
const enemyUnitsWithStats = [];
const ownUnitWrapper = document.querySelector(".own-unit-zone");
const ownUnitsElements = [...ownUnitWrapper.querySelectorAll(".trump-unit")];
const ownUnitsWithStats = [];
//const unitsWithStatsInOrder: UnitWithStats[] = [];
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
};
/*const getUnitsOrder = (): void => {
  const orderWrapper = document.querySelector(".turn-order") as HTMLElement;
  const unitsElementsInOrder = [...orderWrapper.querySelectorAll(".trump-unit-portrait")] as HTMLElement[];
  const unitsInOrder: string[] = [];

  unitsElementsInOrder?.forEach((unitElement: HTMLElement) => {
    const unitClassName = [...unitElement.classList].find((className) => className.startsWith("look-")) as string;
    unitsInOrder.push(unitClassName);
  });

  const allUnits = [...enemyUnitsWithStats, ...ownUnitsWithStats];
  allUnits.sort((a, b) => {
    return unitsInOrder.indexOf(a.unitName) - unitsInOrder.indexOf(b.unitName);
  });

  unitsWithStatsInOrder.push(...allUnits);
};*/
/*
const getGroupAttack = (): void => {
  let attackGroupSum = 0;
  let currentGroup: UnitWithStats[] = [];

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
};*/
const attackEnemy = () => {
    const strongestUnit = enemyUnitsWithStats.reduce((prevUnit, currentUnit) => {
        if (currentUnit.unitElement.classList.contains("dead")) {
            return prevUnit;
        }
        return currentUnit.attackAvg > prevUnit.attackAvg ? currentUnit : prevUnit;
    });
    console.log(strongestUnit);
    strongestUnit.unitElement = enemyUnitWrapper.querySelector(`.${strongestUnit.unitName}`)?.parentElement;
    strongestUnit.unitElement.click();
    //await new Promise((resolve) => setTimeout(resolve, 1000));
};
getUnitsStats(enemyUnitsElements, enemyUnitsWithStats, false);
getUnitsStats(ownUnitsElements, ownUnitsWithStats, true);
//getUnitsOrder();
//getGroupAttack();
attackEnemy();
export {};
