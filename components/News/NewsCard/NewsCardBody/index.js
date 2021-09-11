import styles from './styles.module.scss'
import {
  stylesForBlurBackgroundSmall,
  stylesForSmall,
  stylesForBig,
  stylesForBlurBackgroundBig,
  stylesForDescriptionBig,
  stylesForDescriptionSmall
} from "./styles";

const NewsCardBody = ({isEven, data}) => {

  return (
    <div style={isEven ? stylesForSmall : stylesForBig}
         className={styles.newsCardBody}>
      <div style={isEven ? stylesForBlurBackgroundSmall : stylesForBlurBackgroundBig}
           className={styles.blurBackground}/>
      <div style={isEven ? stylesForDescriptionSmall : stylesForDescriptionBig} className={styles.description}>
        <h4>{data && data.title}</h4>
        <p>{data && data.description.length > 100 ? data.description.slice(0, 100) + "..." : data.description}</p>
        <div className={styles.footer}>
          <span>
            {data && data.created_at}
          </span>
          <div>
            <span>
              <img src="/icons/newsComments.svg" alt=""/>
              {data && data.comment_count}
            </span>
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