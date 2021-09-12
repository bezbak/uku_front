import styles from './styles.module.scss'
import Card from "../../Card";
import {useRecoilState, useResetRecoilState} from "recoil";
import {currentCategoryAtom, publicationFeed} from "../state";
import {useEffect, useRef} from "react";
import {getPublications} from "./getPublications";
import {cb, options} from "../../../util/interSectionObserver";
import CreatePublicationWithoutPhoto from "../CreatePublicationWithoutPhoto";
import NewsCard from "../../News";
import {categoryAtom} from "../../CreatePublication/state";

const Publications = () => {
  const [data, setData] = useRecoilState(publicationFeed)
  const [currentCategory] = useRecoilState(currentCategoryAtom)
  const [selectedCategory] = useRecoilState(categoryAtom)

  const ref = useRef(null)

  // INITIAL LOAD
  useEffect(() => {
    getPublications(false, 1).then(data => {
      setData(old => ({...old, ...data, results: [...data.results]}))
    })
  }, [])

  useEffect(() => {
    getPublications(selectedCategory?.id, 1).then(data => {
      setData(old => ({currentPage: null, ...data, results: [...data.results]}))
    })
  }, [selectedCategory?.id])

  useEffect(() => {
    if (data.currentPage) {
      getPublications(selectedCategory?.id, data.currentPage).then(data => {
        if (data.next) {
          setData(old => ({...old, ...data, results: [...old.results, ...data.results]}))
        }
      })
    }

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