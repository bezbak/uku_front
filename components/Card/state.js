import {atom} from "recoil";

export const page = atom({
    key: 'page',
    default: 0
})

export let cards = atom({
    key: "cards",
    default: {
        results: []
    },
    dangerouslyAllowMutability: true
})

