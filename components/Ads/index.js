import React, {useEffect, useState} from "react";
import Button from "../Button";
import Card from "../Card";
import PlusIcon from '../../public/icons/plus.svg'
import styles from './styles.module.scss'
import useIsMobile from "../../hooks/useIsMobile";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/category/slice";

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
const ComponentAds = ({title,setAddPublicationModal, data, publication}) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const category_id = useSelector((store) => store.category.category_id, shallowEqual);
  const categoryPublications = useSelector((store) => store.category.categoryPublications, shallowEqual);
  const categoryPublicationRequest= (page) => dispatch(actions.categoryPublicationsRequestStart({page: page}));

  const handleScroll = (event) => {
    const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prev => prev + 1);
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(()=>{
      categoryPublicationRequest(page)
    },1000)
    setLoading(false)
  }, [page,category_id])

  // const [addPublicationModal,setAddPublicationModal]=useState(false)
  return (
    <div className={styles.ads}>
      <div className={styles.ads__title}>
        <span>
          Объявления
          {title}
        </span>
      </div>
      <div className={styles.ads__container} onScroll={handleScroll}>
        <Button className={styles.ads__container__addPublicationButton}
                textClassName={styles.ads__container__addPublicationButton_text}
                onClick={ ()=>setAddPublicationModal(true)}>
          {isMobile ? <PlusIcon/> :'Добавить объявление'}
        </Button>
        {
          categoryPublications?.results?.map(slide =>
            <Card slideData={slide} key={slide.id} publication/>
          )
        }
      </div>
    </div>
  )
}
export default ComponentAds;