import React from "react";
import styles from './styles.module.scss'
import Card from "../Card";

const sliderData = [
  {
    id: 1,
    src: 'images/lenta.png',
    altInfo: 'shoe',
  },
  {
    id: 2,
    src: 'images/lenta.png',
    altInfo: 'shoe',
  },
  {
    id: 3,
    src: 'images/lenta.png',
    altInfo: 'shoe',
  },
  {
    id: 4,
    src: 'images/lenta.png',
    altInfo: 'shoe',
  },
  {
    id: 5,
    src: 'images/lenta.png',
    altInfo: 'shoe',
  }
]
const Main = ({title = "Лента"}) => {
  return (
    <div className={styles.main}>
      <div className={styles.main__title}>
        <span>
          {title}
        </span>
        <div className={styles.main__container}>
          <Card sliderData={sliderData}/>
          <Card sliderData={sliderData}/>
          <Card sliderData={sliderData}/>
          <Card sliderData={sliderData}/>
          <Card sliderData={sliderData}/>
          <Card sliderData={sliderData}/>
        </div>
      </div>
    </div>
  )
}
export default Main;