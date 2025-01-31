import {atom} from "recoil";

export const categoryAtom = atom({
  key: "create",
  default: null,
})

export const newsAtom = atom({
  key: "news",
  default: null
})

export const photosAtom = atom({
  key: "photosAtom",
  default: {
    files: [],
    preview: 0,
  },
  dangerouslyAllowMutability: true,
})

export const textAtom = atom({
  key: "textAtom",
  default: ""
})

export const displayChildrenAtom = atom({
  key: "displayAtom",
  default: {},
})
