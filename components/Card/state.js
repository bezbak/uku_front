import {atom} from "recoil";

export const page = atom({
    key: 'page',
    default: 1
})

export let cards = atom({
    key: "cards",
    default: {
        results: [],
        next: true
    },
    dangerouslyAllowMutability: true
})

