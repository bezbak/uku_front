import React, {useEffect} from "react";
import styles from './styles.module.scss'
import Card from "../Card";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/profile/slice";

const sliderData = [
  {
    id: 1,
    name: "Фывова Александра",
    address: 'Москва',
    description: 'height: 34px;\n' +
      'width: 336px;\n' +
      'left: 0px;\n' +
      'top: 24px;\n' +
      'border-radius: nullpx;\n',
    src: 'images/lenta.png',
    commentCount: 1,
    data: 8,
    altInfo: 'shoe',
    slider: [
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
    altInfo: 'shoe', slider: [
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
    slider: [
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
  const dispatch = useDispatch();
  const is_profile_completed = useSelector((store) => store.auth?.is_profile_completed);
  const feedRequest = () => dispatch(actions.feedRequestStart());
  useEffect(() => {
    if (is_profile_completed)
      feedRequest()
  }, [is_profile_completed])
  const userPublicationFeed = useSelector((store) => store.profile.feed, shallowEqual);
  return (
    <div className={styles.main}>
      <div className={styles.main__title}>
        <span>
          {title}
        </span>
      </div>
      <div className={styles.main__container}>
        {is_profile_completed &&
        userPublicationFeed?.results?.map(slide =>
          <Card slideData={slide} key={slide.id} publication={false}/>
        )
        }
      </div>
    </div>
  )
}
export default Main;