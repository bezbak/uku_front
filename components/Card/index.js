import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";

const Card = ({width}) => {

    return (
        <div className={styles.card} style={{width: width}}>
            <CardHead/>
            <CardSlider/>
            <CardBody/>
            <CardFooter/>
        </div>
    )
}

export default Card;