import {atom} from "recoil";

export const page = atom({
    key: 'page',
    default: 1
})

export const cards = atom({
    key: "cards",
    default: {}
})