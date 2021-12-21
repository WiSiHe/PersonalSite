import { atom } from 'recoil';

export const theme = atom({
  key: 'theme', // unique ID (with respect to other atoms/selectors)
  default: 'light', // default value (aka initial value)
});
