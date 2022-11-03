import { atom } from "recoil";

export const ReloadProfile = atom({
    key: 'ReloadProfile', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });