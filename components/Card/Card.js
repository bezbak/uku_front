import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";

const Card = () => {

    return (
        <div className={styles.card}>
            <CardHead/>
            <CardSlider/>
            <CardBody/>
            <CardFooter/>
        </div>
    )
}

export default Card;