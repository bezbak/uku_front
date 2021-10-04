import NewsCardHead from "./NewsCard/NewsCardHead";
import NewsCardBody from "./NewsCard/NewsCardBody";
import Link from "next/link";
import React from 'react'
import styles from './styles.module.scss'

const NewsCard = ({news}) => {
  {
    return news && news.map((item, index) => {
      if (item.publication_type === "news") {
        return <React.Fragment key={index}>
          <div className={styles.newsCard}>
            <NewsCardHead
              user={item.user}
              image={item.images}
            />
            <NewsCardBody
              data={item}
            />
          </div>
        </React.Fragment>
      } else {
        return null
      }
    })
  }
}

export default NewsCard;