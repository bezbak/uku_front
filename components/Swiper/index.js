import React, {useRef} from "react";
import classNames from "classnames";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import styles from './styles.module.scss'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwiperCard = ({data}) => {
  const swiperRef = useRef();
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  const setActiveSlide = (swiper) => setActiveSlideIndex(swiper.activeIndex);
  return (
    <div className={styles.swiperCard}>
      <Swiper
        slidesPerView={1}
        // onSlideChange={setActiveSlide}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{
          clickable: true,
          el: `.${styles.swiperCard__sliderPagination}`,
          type: 'bullets',
          bulletActiveClass: styles.swiperCard__sliderPagination_active,
          bulletClass: styles.swiperCard__sliderPagination_icon
        }}
      >
        {data?.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={classNames(styles.swiperCard__slide)}>
                <img src={slide.src}/>
              </div>
            </SwiperSlide>
          );
        })}
        <div className={classNames(styles.swiperCard__sliderPagination)}/>
      </Swiper>
    </div>
  )
}
export default SwiperCard;