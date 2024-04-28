import { atom } from "nanostores";

export const studyTime = atom(0);
export const breakTime = atom(0);
export const cycles = atom(0);
export const isRunning = atom(false);

export const setStudyTime = (min: number) => studyTime.set(min);
export const setBreakTime = (min: number) => breakTime.set(min);
export const setCycles = (c: number) => cycles.set(c);
export const setIsRunning = (b: boolean) => isRunning.set(b);
export const clearStore = () => {
  studyTime.set(0);
  breakTime.set(0);
  cycles.set(0);
  isRunning.set(false);
};
