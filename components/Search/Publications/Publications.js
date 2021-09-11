import styles from './styles.module.scss'
import Card from "../../Card";
import {useRecoilState, useResetRecoilState} from "recoil";
import {currentCategoryAtom, publicationFeed} from "../state";
import {useEffect, useRef} from "react";
import {getPublications} from "./getPublications";
import {cb, options} from "../../../util/interSectionObserver";
import CreatePublicationWithoutPhoto from "../CreatePublicationWithoutPhoto";
import News from "../News";
import NewsFeed from "../../News";
import NewsCard from "../../News";

const Publications = () => {
  const [data, setData] = useRecoilState(publicationFeed)
  const resetMainfeed = useResetRecoilState(publicationFeed)
  const [currentCategory, setCurrentCategory] = useRecoilState(currentCategoryAtom)
  const ref = useRef(null)


  useEffect(() => {
    resetMainfeed()
  }, [])

  useEffect(() => {
    getPublications(data.currentPage).then(data => {
      setData(old => ({...old, ...data, results: [...old.results, ...data.results]}))
    })
  }, [data.currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => cb(entry, setData), options)
    if (ref && ref.current && data.next) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [data.next])

  return (
    <div className={styles.publications}>
      <h1>{currentCategory?.includes("d") ? "Публикации" : "Новости и статьи"}</h1>
      <div className={styles.feed}>
        {currentCategory?.includes("d") ?
          <Card
            cards={data.results}
            setRecoilState={setData}
            width={"280px"}
          />
          :
          <NewsCard
            news={data.results}
          />}

      </div>
      <div ref={ref}/>
      <CreatePublicationWithoutPhoto/>
    </div>
  )
}

export default Publications;