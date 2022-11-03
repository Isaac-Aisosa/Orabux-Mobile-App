import { atom } from "recoil";

export const SignedInState = atom({
    key: 'SignedIn', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });