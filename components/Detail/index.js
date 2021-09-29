import Navigation from "./Navigation";
import DetailInfo from "./DetailInfo";
import styles from './styles.module.scss'
import classNames from "classnames";
import {useEffect} from "react";
import {getDetailPublication} from "./request";
import {useRecoilState} from "recoil";
import {detailPublicationState} from "./state";
import ModalDeletePublication from "../ModalDeletePublication/ModalDeletePublication";
import ModalUpdatePublication from "../ModalUpdatePublication";
import ModalDeleteImages from "../ModalDeleteImages";

const Detail = () => {
    const [recoilState, setRecoilState] = useRecoilState(detailPublicationState)

    useEffect(async () => {
        const detail = await getDetailPublication()
        setRecoilState(detail)
        },[])

    return (
        <div className={classNames("container", styles.detail)}>
            {recoilState &&
                <>
                    <Navigation/>
                    <DetailInfo/>
                    <ModalDeletePublication/>
                    <ModalUpdatePublication/>
                    <ModalDeleteImages/>
                </>
            }
        </div>
    )
}

export default Detail;