import {atom} from "recoil";

export const detailPublicationState = atom({
    key: "detailPublicationState",
    default: [],
})


export const modalStateFlag = atom({
    key: "modalDelete",
    default: {
        updateModal: false,
        deletePublicationModal: false,
        deleteImageModal: false,
        imageId: null
    }
})

