import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import Region from "../../Login/Registration/Region/Region";
import {useRecoilState} from "recoil";
import {modalAtom} from "../../Search/state";

const Location = () => {
    const [modal, setModal] = useRecoilState(modalAtom)
    const [location, setLocation] = useState(null)

    useEffect(() => {
        setLocation(JSON.parse(localStorage.getItem("authData")).region_detail.name)
    }, [])

    return (
        <div onClick={() => setModal(!modal)} className={styles.location}>
            <img
                src="/icons/locationIcon.png"
                alt=""/>
            <span>{location}</span>
        </div>
    )
}

export default Location;