import React from "react";
import classNames from "classnames";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import styles from './styles.module.scss'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwiperCard = ({sliderData}) => {
  const swiperRef = React.useRef();
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  const setActiveSlide = (swiper) => setActiveSlideIndex(swiper.activeIndex);
  return (
    <div className={styles.swiperCard}>
      <Swiper
        slidesPerView={1}
        // onSlideChange={setActiveSlide}
        // onSwiper={(swiper) => swiperRef.current = swiper}
        // navigation
        pagination={{
          clickable: true,
          el: `.${styles.swiperCard__sliderPagination}`,
          bulletActiveClass: styles.swiperCard__sliderPagination_active,
          bulletClass: styles.swiperCard__sliderPagination_icon,
          type: 'bullets',
        }}
      >
        {sliderData.map((slide) => {
          return (
            <SwiperSlide key={slide.id}>
              <div className={classNames(styles.swiperCard__slide)}>
                <img src={slide.src}/>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={styles.swiperCard__sliderPagination}/>
    </div>
  )
}
export default SwiperCard;