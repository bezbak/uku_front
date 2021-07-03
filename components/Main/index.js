import React, {useEffect} from "react";
import styles from './styles.module.scss'
import Card from "../Card";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../public/store/profile/slice";
import {actions as toastAction} from "../../public/store/toast/slice";

const sliderData = [
  {
    id: 1,
    name:"Фывова Александра",
    address :'Москва',
    description:'height: 34px;\n' +
      'width: 336px;\n' +
      'left: 0px;\n' +
      'top: 24px;\n' +
      'border-radius: nullpx;\n',
    src: 'images/lenta.png',
    commentCount: 1,
    data:8,
    altInfo: 'shoe',
    slider :[
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
    altInfo: 'shoe',  slider :[
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
  },
  {
    id: 5,
    src: 'images/lenta.png',
    altInfo: 'shoe',
    slider :[
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
  }
]
const Main = ({title = "Лента"}) => {

  return (
    <div className={styles.main}>
      <div className={styles.main__title}>
        <span>
          {title}
        </span>
      </div>
        <div className={styles.main__container}>
          {
            sliderData.map(slide =>
               <Card slideData={slide} key={slide.id}/>
            )
          }
        </div>
    </div>
  )
}
export default Main;