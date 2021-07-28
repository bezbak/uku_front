import React, {useRef} from "react";
import classNames from "classnames";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import styles from './styles.module.scss'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const PublicationImgSlider = ({data, onClick}) => {
  const swiperRef = useRef();
  // const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  // const setActiveSlide = (swiper) => setActiveSlideIndex(swiper.activeIndex);

  return (
    <div className={styles.swiperCard} onClick={onClick}>
      <Swiper
        slidesPerView={1}
        // onSlideChange={setActiveSlide}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
          el: `.${styles.swiperCard__sliderPagination}`,
          type: 'bullets',
          // loop:true,
          bulletActiveClass: styles.swiperCard__sliderPagination_active,
          bulletClass: styles.swiperCard__sliderPagination_icon
        }}
      >
        {data?.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={classNames(styles.swiperCard__slide)}>
                <img src={slide.image ? slide.image : placeholder_publication}/>
              </div>
            </SwiperSlide>
          );
        })}
        <div className={classNames(styles.swiperCard__sliderPagination)}/>
      </Swiper>
    </div>
  )
}
export default PublicationImgSlider;