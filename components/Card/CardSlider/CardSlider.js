import styles from './styles.module.scss'
import {useState} from "react";

const CardSlider = ({images, owner}) => {
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
          height: owner ? "237px" : "190px"
        }
      }
      className={styles.image}>
      {images && images.slice(0, 5).map((item, index, arr) => {
        if (arr.length === 1) {
          return <div
            key={item.id}
            onMouseOver={() => onMouseOverCol(item.image)}
            className={styles.colOne}/>
        }
        return <div
          key={item.id}
          onMouseOver={() => onMouseOverCol(item.image)}
          className={styles.col}/>
      })}
    </div>
  )
}

export default CardSlider;