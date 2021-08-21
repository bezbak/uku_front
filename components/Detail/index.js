import Navigation from "./Navigation";
import DetailInfo from "./DetailInfo";
import styles from './styles.module.scss'
import classNames from "classnames";
import uku from "../../adapters/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import {useEffect, useState} from "react";

const Detail = () => {
    let path
    const [data, setData] = useState([])
    useEffect(() => {
        console.log(window.location)
        path = window.location.href.split('/').pop()
        console.log(path, 'path')
        fetch(uku + endpoints.publicationDetails + path,
            {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                }
            ).then(res => res.json().then(data => setData(data)))
    },[])
    return (
        <div className={classNames("container", styles.detail)}>
            {data &&
                <>
                    <Navigation {...data}/>
                    <DetailInfo {...data}/>
                </>
            }
        </div>
    )
}

export default Detail;