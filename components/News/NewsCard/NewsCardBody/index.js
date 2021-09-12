import styles from './styles.module.scss'
import {
  stylesForBlurBackgroundSmall,
  stylesForSmall,
  stylesForDescriptionSmall
} from "./styles";
import Link from "next/link";
import {useRouter} from "next/router";

const NewsCardBody = ({data}) => {

  const router = useRouter()

  const onClickNews = () => {
    router.push(`detail/${data.id}`)
  }

  return (
    <div onClick={onClickNews} style={stylesForSmall(data && data.images)}
         className={styles.newsCardBody}>
      <div style={stylesForBlurBackgroundSmall}
           className={styles.blurBackground}/>
      <div style={stylesForDescriptionSmall} className={styles.description}>
        <p>{data && data.description.length > 100 ? data.description.slice(0, 100) + "..." : data.description}</p>
        <div className={styles.footer}>
          <span>
            {data && data.created_at}
          </span>
          <div>
            <span>
              <img src="/icons/eye.svg" alt=""/>
              {data && data.viewed}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCardBody;