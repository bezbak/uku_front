import {atom} from "recoil";

export const page = atom({
    key: 'page',
    default: 1
})

export let mainFeed = atom({
    key: "mainFeed",
    default: {
        results: [],
        currentPage: 1,
        next: 1,
        previous: null,
        count: null
    },
    dangerouslyAllowMutability: true
})

