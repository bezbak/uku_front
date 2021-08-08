import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";

const Card = ({width, data}) => {
    return (
        <>
            {
                data && data.results.map(item => {
                    console.log(item)
                    return <div className={styles.card} style={{width: width}}>
                        <CardHead user={item.user}/>
                        <CardSlider images={item.images}/>
                        <CardBody categories={item.categories} description={item.description}/>
                        <CardFooter/>
                    </div>
                })
            }
        </>
    )
}

export default Card;