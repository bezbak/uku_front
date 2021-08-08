import styles from './styles.module.scss'
import DetailDescription from "./DetailDescription";
import SwiperContainer from "./Swiper";

const DetailInfo = () => {
    return (
        <div className={styles.detailInfo}>
            <div className={styles.left}>
                <SwiperContainer/>
            </div>
            <div className={styles.right}>
                <DetailDescription/>
            </div>
        </div>
    )
}

export default DetailInfo;