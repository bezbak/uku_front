import styles from './styles.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";

import SwiperCore, {
    Pagination
} from 'swiper/core';

SwiperCore.use([Pagination]);


const SwiperContainer = ({user, images, location}) => {


    return (
        <div>
            <div className={styles.leftHead}>
                <img
                    className={styles.avatar}
                    width={'36px'}
                    height={"36px"}
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
                        return <SwiperSlide key={index}><img src={image && image.image} alt=""/></SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default SwiperContainer;