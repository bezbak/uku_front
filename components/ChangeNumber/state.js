import {atom} from "recoil";

export const changeNumberAtom = atom({
  key: "changeNumberAtom",
  default: "confirm"
})

export const newPhoneAtom = atom({
  key: "newPhoneAtom",
  default: ""
})

export const modalSuccessAtom = atom({
  key: "modalSuccessAtom",
  default: false,
})