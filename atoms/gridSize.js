import { atom } from "recoil";

export const gridSize = atom({
  key: "gridSize", // unique ID (with respect to other atoms/selectors)
  default: 3, // default value (aka initial value)
});
