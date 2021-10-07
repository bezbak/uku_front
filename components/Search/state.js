import {atom} from "recoil";

export const searchData = atom({
  key: "searchData",
  default: {
    data: {
      results: []
    },
    error: null,
    loading: false,
    currentPage: 1,
  },
  dangerouslyAllowMutability: true,
})

export const locationAtom = atom({
  key: "locationAtom",
  default: {}
})

export const searchInputAtom = atom({
  key: "searchInputAtom",
  default: ""
})



