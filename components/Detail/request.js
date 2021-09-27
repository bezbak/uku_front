import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import {toast} from "react-toastify";


export const getDetailPublication = async () => {
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

export const deleteImages = (id) => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    const deleteMethod = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    }
    return(
        fetch(uku + `/publication/image/delete/${id}`,deleteMethod)
            .then(res => {console.log(res)})
            .catch(err => toast.error('Что-то пошло не так...'))
    )
}

