import React from "react";
import Card from "../Card";

import styles from './styles.module.scss'

const sliderData = [
  {
    id: 1,
    name:"Фывова Александра",
    description:'TYPE, KIND, SORT, NATURE, DESCRIPTION,' +
      ' CHARACTER mean a number of individuals thought of' +
      ' as a group because of a common quality or qualities',
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
const ComponentAds = ({title, data, publication}) => {
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
export default ComponentAds;