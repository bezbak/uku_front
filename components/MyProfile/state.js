import {atom} from "recoil";

export const profileAtom = atom({
    key: "profileAtom",
    default: {
        id: '',
        first_name: "",
        last_name: "",
        phone: "",
        avatar: "",
        followers_count: "",
        following_count: "",
        publications_count: "",
        instagram: "",
        telegram: "",
        whatsapp: "",
        following: "",
        gender: "",
        age: ""
    }
})