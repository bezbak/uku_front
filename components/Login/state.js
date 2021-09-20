import {atom} from "recoil";

export const login = atom({
  key: "login",
  default: {
    state: "register",
    token: null,
    is_profile_completed: null,
    region_detail: null
  }
})

export const phoneNumber = atom({
  key: "phoneNumber",
  default: ""
})

export const requestLoading = atom({
  key: "requestLoading",
  default: false
})

export const registrationForm = atom({
  key: "registrationForm",
  default: {
    first_name: "",
    last_name: "",
    gender: "",
    birth_date: new Date(),
    region: {
      id: "",
      name: ""
    },
    checkbox: true
  }
})
