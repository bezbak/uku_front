import React, {useEffect, useState} from "react";
import Card from "../Card";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/favorites/slice";
import Cookie from "js-cookie";
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
const ComponentFavorites = ({title}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const favoritePublicationsList = useSelector((store) => store.favorites.allFavoritePublications, shallowEqual);

  const is_profile_completed = Cookie.get("is_profile_completed")

  const favoritePublicationsRequest = (page) => dispatch(actions.userAllFavoritePublicationsRequestStart(page));

  const handleScroll = (event) => {
    const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prev => prev + 1);
    }
  }

  useEffect(() => {
    setLoading(true);
    favoritePublicationsRequest(page)
    setLoading(false)
  }, [page])


  return (
    <div className={styles.ads} onClick={handleScroll}>
      <div className={styles.ads__title}>
        <span>
          {title}
        </span>
      </div>
      <div className={styles.ads__container}>
        {
          favoritePublicationsList?.results?.map(slide =>
            <Card slideData={slide} key={slide.id} publication/>
          )
        }
      </div>
    </div>
  )
}
export default ComponentFavorites;