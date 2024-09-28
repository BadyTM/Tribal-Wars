interface UnitWithStats {
  unitName: string;
  unitElement: HTMLElement;
  health: number;
  attackMin: number;
  attackMax: number;
  attackAvg: number;
}

const enemyUnitWrapper = document.querySelector(".enemy-unit-zone") as HTMLElement;
const enemyUnitsElements = [...enemyUnitWrapper.querySelectorAll(".trump-unit")] as HTMLElement[];
const enemyUnitsWithStats: UnitWithStats[] = [];

const ownUnitWrapper = document.querySelector(".own-unit-zone") as HTMLElement;
const ownUnitsElements = [...ownUnitWrapper.querySelectorAll(".trump-unit")] as HTMLElement[];
const ownUnitsWithStats: UnitWithStats[] = [];

const unitsInOrder: string[] = [];

const getUnitsStats = (unitsElementsArray: HTMLElement[], unitsStatsArray: UnitWithStats[]): void => {
  unitsElementsArray?.forEach((unitElement: HTMLElement): void => {
    const unitClasses = unitElement.querySelector(".trump-unit-portrait")?.classList as DOMTokenList;

    const unitClassName = [...unitClasses].find((className) => className.startsWith("look-")) as string;
    const unitHealth = parseInt((unitElement.querySelector(".health") as HTMLElement).innerText);
    const unitAttackWrapper = unitElement.querySelector(".attack");
    const unitAttackMin = parseInt((unitAttackWrapper?.querySelector(".min") as HTMLElement).innerText);
    const unitAttackMax = parseInt((unitAttackWrapper?.querySelector(".max") as HTMLElement).innerText);

    const unitWithStats: UnitWithStats = {
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

const getUnitsOrder = (): UnitWithStats[] => {
  const orderWrapper = document.querySelector(".turn-order") as HTMLElement;
  const unitsElementsInOrder = [...orderWrapper.querySelectorAll(".trump-unit-portrait")] as HTMLElement[];

  unitsElementsInOrder?.forEach((unitElement: HTMLElement) => {
    const unitClassName = [...unitElement.classList].find((className) => className.startsWith("look-")) as string;
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