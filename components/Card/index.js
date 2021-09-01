import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";
import {onClickFavourite} from "./functions";
import {useSetRecoilState} from "recoil";
import {mainFeed} from "./state";
import Heart from '../../public/icons/Heart.svg'
import HeartFill from '../../public/icons/HeartFill.svg'

const Card = ({cards, width}) => {

  const setRecoilState = useSetRecoilState(mainFeed)

  if (!cards) return <div/>

  return (
    <>
      {
        cards.map((item, index) => {
          return <div
            key={index}
            className={styles.card}
            style={{width}}>
            {item.user || item.is_owner ? <CardHead user={item.user}/> : null}
            <Link href={`/detail/${item.id}`}>
              <div className={styles.content}>
                <CardSlider images={item.images}/>
                <div
                  onClick={(e) => onClickFavourite(item.id, index, setRecoilState, e)}
                  className={styles.favorite}
                >
                  {item.is_favorite ? <HeartFill/> : <Heart/>}
                </div>
                {/*<img*/}
                {/*  onClick={(e) => onClickFavourite(item.id, index, setRecoilState, e)}*/}
                {/*  className={styles.favorite}*/}
                {/*  src={item.is_favorite ? "/icons/isFavourite.png" : "/icons/heart.png"}*/}
                {/*  alt=""/>*/}
                <CardBody categories={item.categories} description={item.description}/>
                <CardFooter created_at={item.created_at} comment_count={item.comment_count}
                            viewed={item.viewed}/>
              </div>
            </Link>
          </div>
        })
      }
    </>
  )
}

export default Card;