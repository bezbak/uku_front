import styles from './styles.module.scss'
import {useState} from "react";

const CardSlider = ({images}) => {

    const [currentImage, setCurrentImage] = useState(null)

    const onMouseOverCol = imgUrl => {
        setCurrentImage(imgUrl)
    }
    return (
        <div
            style={
                {
                    background: currentImage ? `url(${currentImage}) no-repeat` :
                        images[0] ? `url(${images[0]?.image}) no-repeat` : `url("/images/noImage.png") no-repeat`,
                }
            }
            className={styles.image}>
            {images && images.slice(0, 5).map((item) => {
                return <div
                    key={item.id}
                    onMouseOver={() => onMouseOverCol(item.image)}
                    className={styles.col}/>
            })}
            {/*{images.length > 5 ? <div*/}
            {/*    onMouseOver={() => onMouseOverCol("/images/moreImage.png")}*/}
            {/*    className={styles.more}><span>Внутри еще {images.length - 5}</span></div> : null}*/}
        </div>
    )
}

export default CardSlider;