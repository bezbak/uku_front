import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";

export const getLocations = async () => {
    const response = await fetch(uku + endpoints.location)
    return await response.json()
}