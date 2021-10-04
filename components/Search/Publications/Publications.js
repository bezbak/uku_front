import styles from './styles.module.scss'
import Card from "../../Card";
import {useRecoilState, useResetRecoilState} from "recoil";
import {currentCategoryAtom, publicationFeed} from "../state";
import {useEffect, useRef} from "react";
import {getPublications} from "./getPublications";
import {cb, options} from "../../../util/interSectionObserver";
import CreatePublicationWithoutPhoto from "../CreatePublicationWithoutPhoto";
import NewsCard from "../../News";
import LoaderComponent from "../../Loader";
import {categoryAtom} from "../../CreatePublication/state";

const Publications = () => {
  const [data, setData] = useRecoilState(publicationFeed)
  const [currentCategory] = useRecoilState(currentCategoryAtom)
  const [selectedCategory] = useRecoilState(categoryAtom)
  const ref = useRef(null)

  useEffect(() => {
    setData(old => ({...old, loading: !old.loading}))
    getPublications(false, data.currentPage).then(data => {
      setData(old => ({...old, ...data, results: [...data.results]}))
    }).finally(() => setData(old => ({...old, loading: !old.loading})))
  }, [])

  useEffect(() => {
    setData(old => ({...old, loading: !old.loading}))
    getPublications(selectedCategory?.id, 1).then(data => {
      setData(old => ({currentPage: null, ...data, results: [...data.results], loading: !old.loading}))
    })
  }, [selectedCategory?.id])

  useEffect(() => {
    setData(old => ({...old, loading: !old.loading}))
    if (data.currentPage) {
      getPublications(selectedCategory?.id, data.currentPage).then(data => {
        if (data.next) {
          setData(old => ({...old, ...data, results: [...old.results, ...data.results]}))
        }
      }).finally(() => setData(old => ({...old, loading: !old.loading})))
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
          null}

        {currentCategory?.includes("news") ?
          <NewsCard
            news={data.results}
          /> : null}

        {!currentCategory ? <Card
          cards={data.results}
          setRecoilState={setData}
          width={"280px"}
        /> : null}

      </div>
      <LoaderComponent loading={data.loading}/>
      <div ref={ref}/>
      <CreatePublicationWithoutPhoto/>
    </div>
  )
}

export default Publications;