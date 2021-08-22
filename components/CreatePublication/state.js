import {atom} from "recoil";

const createWindow = atom({
    key: "create",
    default: {
        bottomPanel: false,
        fullWindow: false,
        category: null
    }
})
export default createWindow