import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";

export const getComments = async () => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    const header = {
        headers: {
            Authorization: `Token ${token}`
        }
    }
    const response = await fetch(uku + endpoints.publicationDetails + window.location.href.split('/').pop(), token ? header : null)
    const data = await response.json()
    return data
}