import Navigation from "./Navigation";
import DetailInfo from "./DetailInfo";
import styles from './styles.module.scss'
import classNames from "classnames";
import {useEffect, useState} from "react";
import {getComments} from "./request";
import {useRecoilState} from "recoil";
import {commentState} from "./state";
import ModalDelete from "../ModalDelete/ModalDelete";

const Detail = () => {
    const [recoilState, setRecoilState] = useRecoilState(commentState)
    useEffect(async () => {
        const detail = await getComments()
        setRecoilState(detail)
        },[])
    return (
        <div className={classNames("container", styles.detail)}>
            {recoilState &&
                <>
                    <Navigation {...recoilState}/>
                    <DetailInfo {...recoilState}/>
                    <ModalDelete/>
                </>
            }
        </div>
    )
}

export default Detail;