import {atom} from "recoil";

export const mobileCreateAtom = atom({
  key: "mobileCreate",
  default:{
    images: [],
    previewImageIndex: null,
    showCreateModal: false,
  },
  dangerouslyAllowMutability: true,
})