import styles from './styles.module.scss'
import DetailDescription from "./DetailDescription";
import SwiperContainer from "./Swiper";
import {useRouter} from "next/router";
import useSWR from "swr";
import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import fetcher from "../../util/getFetcher";
import {useResetRecoilState} from "recoil";
import {categoryAtom} from "../CreatePublication/state";
import {useEffect} from "react";

const DetailInfo = () => {
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
        <DetailDescription/>
      </div>
    </div>
  )
}

export default DetailInfo;