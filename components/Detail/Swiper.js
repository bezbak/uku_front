import React, {useEffect, useState} from "react";
import styles from './styles.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {
    Pagination
} from 'swiper/core';
import {useRecoilState} from "recoil";
import {detailPublicationState} from "./state";

SwiperCore.use([Pagination]);


const SwiperContainer = () => {
    const [recoilState] = useRecoilState(detailPublicationState)
    const [images, setImages] = useState([])
    const {user,location} = recoilState

    React.useEffect(() => {
        setImages(recoilState.images)
    },[recoilState.images])

    return (
        <div>
            <div className={styles.leftHead}>
                <img
                    className={styles.avatar}
                    src={user && user.avatar}
                    alt=""/>
                <div>
                    <p className={styles.leftHeadName}>{user && user.last_name} {user && user.first_name}</p>
                    <p className={styles.leftHeadPlace}>{location && location.name}</p>
                </div>
            </div>
            <div>
                <Swiper pagination={true} className={styles.swiper}>
                    {images && images.map((image, index) => {
                        return <SwiperSlide key={index}><img src={image && image.image} alt="image"/></SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default SwiperContainer;