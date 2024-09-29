interface UnitWithStats {
  ownUnit: boolean;
  unitElement: HTMLElement;
  unitName: string;
  health: number;
  attackMin: number;
  attackMax: number;
  attackAvg: number;
  groupAttack: number;
}

const enemyUnitWrapper = document.querySelector(".enemy-unit-zone") as HTMLElement;
const enemyUnitsElements = [...enemyUnitWrapper.querySelectorAll(".trump-unit")] as HTMLElement[];
const enemyUnitsWithStats: UnitWithStats[] = [];

const ownUnitWrapper = document.querySelector(".own-unit-zone") as HTMLElement;
const ownUnitsElements = [...ownUnitWrapper.querySelectorAll(".trump-unit")] as HTMLElement[];
const ownUnitsWithStats: UnitWithStats[] = [];

const unitsWithStatsInOrder: UnitWithStats[] = [];

const getUnitsStats = (unitsElementsArray: HTMLElement[], unitsStatsArray: UnitWithStats[], ownUnit: boolean): void => {
  unitsElementsArray?.forEach((unitElement: HTMLElement): void => {
    const unitClasses = unitElement.querySelector(".trump-unit-portrait")?.classList as DOMTokenList;

    const unitClassName = [...unitClasses].find((className) => className.startsWith("look-")) as string;
    const unitHealth = parseInt((unitElement.querySelector(".health") as HTMLElement).innerText);
    const unitAttackWrapper = unitElement.querySelector(".attack");
    const unitAttackMin = parseInt((unitAttackWrapper?.querySelector(".min") as HTMLElement).innerText);
    const unitAttackMax = parseInt((unitAttackWrapper?.querySelector(".max") as HTMLElement).innerText);

    const unitWithStats: UnitWithStats = {
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

const getUnitsOrder = (): void => {
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
};

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
};

const attackEnemy = (): void => {
  const strongestUnit = enemyUnitsWithStats.reduce((prevUnit, currentUnit) => {
    const parentElement = currentUnit.unitElement.parentElement;

    if (parentElement && parentElement.classList.contains("dead")) {
      return prevUnit;
    }

    return currentUnit.attackAvg > prevUnit.attackAvg ? currentUnit : prevUnit;
  });
  strongestUnit.unitElement.click();
  strongestUnit.unitElement = document.querySelector(`.${strongestUnit.unitName}`) as HTMLElement;
};

getUnitsStats(enemyUnitsElements, enemyUnitsWithStats, false);
getUnitsStats(ownUnitsElements, ownUnitsWithStats, true);
getUnitsOrder();
getGroupAttack();
attackEnemy();
