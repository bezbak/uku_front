import React from "react";
import Card from "../Card";

import styles from './styles.module.scss'

const sliderData = [
  {
    id: 1,
    name:"Фывова Александра",
    description:'Want to know more? \n' +
      'Please reach out to know more ' +
      'details on our innovations and to arrange for a ' +
      'meeting with our innovation expert.',
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
const ComponentFavorites = ({title, data, publication}) => {
  return (
    <div className={styles.ads}>
      <div className={styles.ads__title}>
        <span>
          {title}
        </span>
      </div>
      <div className={styles.ads__container}>
        {
          sliderData.map(slide =>
            <Card slideData={slide} key={slide.id} publication/>
          )
        }
      </div>
    </div>
  )
}
export default ComponentFavorites;