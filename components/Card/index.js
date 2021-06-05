import React from "react";
import styles from './styls.module.scss'
import SwiperCard from "../Swiper";

const Card = ({name="Фывова Александра", address="Москва",}) =>{
  return(
    <div className={styles.card}>
      <div className={styles.card__headline}>
        <img src="images/profilImg.png"/>
        <div className={styles.card__headline__info}>
            <span className={styles.card__headline__info_name}>{name}</span>
            <span className={styles.card__headline__info_address}>{address}</span>
        </div>
        <div className={styles.card__headline__follow}>
          <span>
            Подписаться
          </span>
        </div>
      </div>
      <SwiperCard/>
      <div className={styles.card__footer}>
        <div className={styles.card__footer__category}>
          <span>Категория/ Подкатегория 1</span>
        </div>
        <div className={styles.card__footer__description}>
          <span>
            В бизнес комплекс срочно требуется уборщицы за наличку 3 Женщины
          </span>
        </div>
        <div className={styles.card__footer__commentary}>
          <span>
            Посмотреть все комментарии (1)
          </span>
        </div>
        <div className={styles.card__footer__timeAndView}>
          <span  className={styles.card__footer__timeAndView_time}>
            8 часов назад
          </span>
          <span  className={styles.card__footer__timeAndView_view}>
            8 часов назад
          </span>

        </div>

      </div>

    </div>
  )
}
export default Card;