import { atom } from "recoil";

export const navdrawer = atom({
  key: "navdrawer", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
