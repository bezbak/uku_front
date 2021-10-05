import React, {useEffect, useRef} from 'react';
import Card from "../components/Card";
import styles from './styles.module.scss'
import {getFavoriteCards} from "../util/getFavoriteCards";
import {options} from "../util/interSectionObserver";
import {favoriteFeed} from "../components/Card/state";
import {useRecoilState, useResetRecoilState} from "recoil";
import classNames from "classnames";
import {toast} from "react-toastify";

const FavoriteFeed = () => {
  const [{data, currentPage, loading}, setData] = useRecoilState(favoriteFeed)
  const resetFavorite = useResetRecoilState(favoriteFeed)
  const ref = useRef(null)

  useEffect(() => {
    resetFavorite()
  }, [])

  useEffect(() => {
    setData(old => ({...old, loading: !old.loading}))
    getFavoriteCards(currentPage).then(response => {
      if (response.detail) {
        toast.error("Сбой при загрузке данных...")
        return
      }
      setData(old => ({
        ...old,
        data: {next: response?.next ?? null, results: [...old.data.results, ...response.results]}
      }))
    }).finally(() => setData(old => ({...old, loading: !old.loading})))
  }, [currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && data?.next) {
        setData(old => ({...old, currentPage: old.currentPage + 1}))
      }
    }, options)
    if (ref && ref.current && data.next && !data.loading) observer.observe(ref.current)
    return () => ref.current ? observer.unobserve(ref.current) : null
  }, [data.next])

  return (
    <div className={classNames("container", styles.favorite)}>
      <h2>Избранное</h2>
      {data.results.length ? null : <div className={styles.placeholder}/>}
      <div className={styles.feed}>
        <Card width={"368px"}
              cards={data.results}
              setRecoilState={setData}
              page={"favorite"}
        />
      </div>
      {/*<LoaderComponent loading={data.loading}/>*/}
      <div ref={ref}/>
    </div>
  )
}

export default FavoriteFeed;
