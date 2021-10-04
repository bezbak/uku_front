import {atom} from "recoil";

export const publicationFeed = atom({
  key: "publicationFeed",
  default: {
    results: [],
    currentPage: 1,
    next: null,
    previous: null,
    count: null,
    loading: false,
  },
  dangerouslyAllowMutability: true,
})

export const modalAtom = atom({
  key: "modalAtom",
  default: false
})

export const currentCategoryAtom = atom({
  key: "currentCategory",
  default: ""
})

