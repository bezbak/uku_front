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



