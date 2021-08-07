import {atom} from "recoil";

export const login = atom({
    key: "login",
    default: "toConfirm"
})

export const phoneNumber = atom({
    key: "phoneNumber",
    default: ""
})

export const requestLoading = atom({
    key: "requestLoading",
    default: ""
})

