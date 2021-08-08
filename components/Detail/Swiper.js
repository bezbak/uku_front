import styles from './styles.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";

import SwiperCore, {
    Pagination
} from 'swiper/core';

SwiperCore.use([Pagination]);
const SwiperContainer = () => {

    return (
        <div>
            <div className={styles.leftHead}>
                <img width={'36px'} height={"36px"} src="/images/noAvatar.png" alt=""/>
                <div>
                    <p className={styles.leftHeadName}>Lorem ipsum.</p>
                    <p className={styles.leftHeadPlace}>Lorem ipsum dolor sit.</p>
                </div>
            </div>
            <div>
                <Swiper pagination={true} className="mySwiper">
                    <SwiperSlide><img src="/images/swiper.png" alt=""/></SwiperSlide>
                    <SwiperSlide><img src="/images/swiper.png" alt=""/></SwiperSlide>
                    <SwiperSlide><img src="/images/swiper.png" alt=""/></SwiperSlide>
                    <SwiperSlide><img src="/images/swiper.png" alt=""/></SwiperSlide>
                    <SwiperSlide><img src="/images/swiper.png" alt=""/></SwiperSlide>
                    <SwiperSlide><img src="/images/swiper.png" alt=""/></SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default SwiperContainer;