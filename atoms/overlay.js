import { atom } from "recoil";

export const overlay = atom({
  key: "overlay", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
