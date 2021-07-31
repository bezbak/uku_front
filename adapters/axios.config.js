import axios from "axios";



const instance = axios.create({
    baseURL: "http://uku.kg/api/v1"
})

export default instance