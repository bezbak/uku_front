import {atom} from "recoil";

export const page = atom({
  key: 'page',
  default: 1,
})

export let mainFeed = atom({
  key: "mainFeed",
  default: {
    data: {
      results: []
    },
    currentPage: 1,
    error: null,
    loading: false,
  },
  dangerouslyAllowMutability: true
})

export let favoriteFeed = atom({
  key: "favoriteFeed",
  default: {
    data: {
      results: []
    },
    error: null,
    loading: false,
    currentPage: 1,
  },
  dangerouslyAllowMutability: true
})

export let profileFeed = atom({
  key: "profileFeed",
  default: {
    data: {
      results: []
    },
    loading: false,
    error: null,
    currentPage: 1,
  },
  dangerouslyAllowMutability: true
})

export let myProfileFeed = atom({
  key: "myProfileFeed",
  default: {
    data: {
      results: []
    },
    loading: false,
    error: null,
    currentPage: 1,
  },
  dangerouslyAllowMutability: true
})

