import { Info } from "./hooks";

const THRESHOLD_SIZE_RATE = 0.01;

export function getRate(value: number, sum: number): string {
  return `${((100 * value) / sum).toFixed(2)}%`;
}

export function getSum(infoList: Info[]): number {
  return infoList.reduce((accumulator: number, currentValue: Info) => {
    return accumulator + currentValue.size;
  }, 0);
}

export function getMax(infoList: Info[]): number {
  return infoList.reduce((accumulator: number, currentValue: Info) => {
    return Math.max(accumulator, currentValue.size);
  }, -Infinity);
}

export function squashMinorStats(infoList: Info[]): Info[] {
  const newInfoList: Info[] = new Array<Info>();
  const others: Info = {
    name: "Others",
    size: 0,
    color: "#000000",
  };
  const sum: number = getSum(infoList);
  for (const info of infoList) {
    if (THRESHOLD_SIZE_RATE <= info.size / sum) {
      newInfoList.push(info);
    } else {
      others.size += info.size;
    }
  }
  newInfoList.push(others);
  return newInfoList;
}
