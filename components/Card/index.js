import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";

const Card = ({width, data}) => {
    return (
        <>
            {
                data && data.results.map(item => {
                    return <div key={item.id} className={styles.card} style={{width: width}}>
                        <CardHead user={item.user}/>
                        <Link href={`/detail/${item.id}`}>
                            <div>
                                <CardSlider images={item.images}/>
                                <CardBody categories={item.categories} description={item.description}/>
                                <CardFooter created_at={item.created_at} comment_count={item.comment_count}/>
                            </div>
                        </Link>
                    </div>
                })
            }
        </>
    )
}

export default Card;