import uku from "../../../adapters/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";

export const getLocations = async () => {
    const response = await fetch(uku + endpoints.location)
    return await response.json()
}