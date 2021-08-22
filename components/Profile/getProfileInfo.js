import uku from '../../adapters/HTTP_Agent'
import {endpoints} from "../../api/endpoints";

export const getProfileInfo = async () => {
    const token = await JSON.parse(localStorage.getItem("token"))
    const header = {
        headers: {
            Authorization: `Token ${token}`
        }
    }
    const response = await fetch(uku + endpoints.userProfile, token ? header : null)
    return await response.json()
}