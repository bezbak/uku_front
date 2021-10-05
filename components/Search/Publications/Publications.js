import styles from './styles.module.scss'
import Card from "../../Card";
import {useEffect, useRef} from "react";
import {options} from "../../../util/interSectionObserver";
import CreatePublicationWithoutPhoto from "../CreatePublicationWithoutPhoto";
import {useRecoilState} from "recoil";
import {getPublications} from "./getPublications";
import {categoryAtom} from "../../CreatePublication/state";
import {searchData} from "../state";

const SearchPublication = () => {
  const [{data, loading, currentPage}, setSearchState] = useRecoilState(searchData)
  const [selectedCategory] = useRecoilState(categoryAtom)
  const ref = useRef(null)

  useEffect(() => {
    getPublications(selectedCategory?.id ?? false, currentPage).then(response => {
      setSearchState(old => ({
        ...old, data: {
          ...response,
          results: [...old.data.results, ...response.results]
        }
      }))
    })
  }, [currentPage, selectedCategory?.id])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
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
        <Card
          cards={data && data?.results}
          setRecoilState={setSearchState}
          width={"280px"}/>
      </div>
      <div ref={ref}/>
      <CreatePublicationWithoutPhoto/>
    </div>
  )
}

export default SearchPublication;