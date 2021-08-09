import styles from './styles.module.scss'
import DetailDescription from "./DetailDescription";
import SwiperContainer from "./Swiper";
import {useRouter} from "next/router";
import useSWR from "swr";
import uku from "../../adapters/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import fetcher from "../../adapters/getFetcher";

const DetailInfo = () => {


    const router = useRouter()
    const {data, error} = useSWR(uku + endpoints.publicationDetails + `${router.query.detail}`, fetcher)

    return (
        <div className={styles.detailInfo}>
            <div className={styles.left}>
                <SwiperContainer
                    user={data && data.user}
                    images={data && data.images}
                    location={data && data.location}/>
            </div>
            <div className={styles.right}>
                <DetailDescription
                    category={data && data.category}
                    description={data && data.description}
                    comment={data && data.comment}
                />
            </div>
        </div>
    )
}

export default DetailInfo;