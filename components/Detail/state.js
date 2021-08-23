import {atom} from "recoil";

export const commentState = atom({
    key: "commentState",
    default: [],
})

export const modalDelete = atom({
    key: "modalDelete",
    default: {
        flag: false,
    }
})

