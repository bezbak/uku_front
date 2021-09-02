import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";
import {onClickFavourite} from "./functions";
import Heart from '../../public/icons/Heart.svg'
import HeartFill from '../../public/icons/HeartFill.svg'

const Card = ({cards, width, setRecoilState, page = ""}) => {

  if (!cards) return <div/>

  return (
    <>
      {
        cards.map((item, index) => {
          return <div
            key={index}
            className={styles.card}
            style={{width}}>
            {item.user || item.is_owner ?
              <CardHead user={item.user} setRecoilState={setRecoilState} index={index}/> : null}
            <Link href={`/detail/${item.id}`}>
              <div className={styles.content}>
                <CardSlider images={item.images}/>
                <div
                  onClick={(e) => onClickFavourite(item.id, index, setRecoilState, e, page)}
                  className={styles.favorite}
                >
                  {item.is_favorite ? <HeartFill/> : <Heart/>}
                </div>
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