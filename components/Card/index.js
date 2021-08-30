import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";


const Card = ({cards, width}) => {


  return (
    <>
      {
        cards.map((item, index) => {
          return <div
            key={index}
            className={styles.card}
            style={{width}}>
            <CardHead user={item.user}/>
            <Link href={`/detail/${item.id}`}>
              <div className={styles.content}>
                <CardSlider images={item.images}/>
                <CardBody categories={item.categories} description={item.description}/>
                <CardFooter created_at={item.created_at} comment_count={item.comment_count}
                            viewed={item.viewed}/>
              </div>
            </Link>
            <img
              className={styles.favorite}
              src={item.is_favorite ? "/icons/isFavourite.png" : "/icons/heart.png"}
              alt=""/>
          </div>
        })
      }
    </>
  )
}

export default Card;