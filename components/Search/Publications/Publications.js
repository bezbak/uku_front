import styles from './styles.module.scss'
import Card from "../../Card";
import {useEffect, useRef} from "react";
import {options} from "../../../util/interSectionObserver";
import CreatePublicationWithoutPhoto from "../CreatePublicationWithoutPhoto";
import {useRecoilState} from "recoil";
import {getPublications} from "./getPublications";
import {categoryAtom} from "../../CreatePublication/state";
import {locationAtom, searchData, searchInputAtom} from "../state";
import NewsCard from "../../News";

const SearchPublication = () => {
  const [{data, loading, currentPage}, setSearchState] = useRecoilState(searchData)
  const [selectedCategory] = useRecoilState(categoryAtom)
  const [location] = useRecoilState(locationAtom)
  const [search] = useRecoilState(searchInputAtom)
  const ref = useRef(null)

  useEffect(() => {
    getPublications(selectedCategory?.id, currentPage, location?.region?.id, search).then(response => {
      if(response?.results?.length){
        setSearchState(old => ({
          ...old, data: {
            ...response,
            results: old.currentPage !== currentPage ? [...old.data.results, ...response.results] : [...response.results]
          }
        }))
      }
    })
  }, [currentPage, selectedCategory?.id, location?.region, search])



  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && data?.next) {
        setSearchState(old => ({...old, currentPage: old.currentPage + 1}))
      }
    }, options)
    if (ref && ref.current && data?.next && !loading) observer.observe(ref.current)
    return () => ref.current ? observer.unobserve(ref.current) : null
  }, [data?.next])

  return (
    <div className={styles.publications}>
      <h1>{selectedCategory?.name ?? "Публикации"}</h1>
      <div className={styles.feed}>
        {selectedCategory?.name === "Новости" ?
          <NewsCard news={data && data?.results}/>
          :
          <Card
            cards={data && data?.results}
            setRecoilState={setSearchState}
            width={"280px"}/>
        }
      </div>
      <div ref={ref}/>
      <CreatePublicationWithoutPhoto/>
    </div>
  )
}

export default SearchPublication;