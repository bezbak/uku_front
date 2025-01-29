import styles from './styles.module.scss'
import DetailDescription from "./DetailDescription";
import SwiperContainer from "./Swiper";
import {useResetRecoilState} from "recoil";
import {categoryAtom} from "../CreatePublication/state";
import {useEffect} from "react";

const DetailInfo = ({initialData }) => {
  const resetCategory = useResetRecoilState(categoryAtom)

  useEffect(() => {
    resetCategory()    
  }, [])

  return (
    <div className={styles.detailInfo}>
      <div className={styles.left}>
        <SwiperContainer/>
      </div>
      <div className={styles.right}>
        <DetailDescription initialData={initialData}/>
      </div>
    </div>
  )
}

export default DetailInfo;