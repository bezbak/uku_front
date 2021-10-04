import React, {useEffect, useRef} from 'react';
import Card from "../components/Card";
import styles from './styles.module.scss'
import {getFavoriteCards} from "../util/getFavoriteCards";
import {cb, options} from "../util/interSectionObserver";
import {favoriteFeed} from "../components/Card/state";
import {useRecoilState, useResetRecoilState} from "recoil";
import classNames from "classnames";
import Loader from "../components/Loader";
import LoaderComponent from "../components/Loader";

const FavoriteFeed = () => {
  const [data, setData] = useRecoilState(favoriteFeed)
  const resetFavorite = useResetRecoilState(favoriteFeed)
  const ref = useRef(null)

  useEffect(() => {
    resetFavorite()
  }, [])
  console.log(data)
  useEffect(() => {
    setData(old => ({...old, loading: !old.loading}))
    getFavoriteCards(data.currentPage).then(res => res.json().then(value => {
      console.log(value)
      if (value.next !== null && value?.results?.length) {
        setData(old => ({
          ...old,
          ...value,
          results: [...old.results, ...value.results],
        }))
      }
    })).finally(() => setData(old => ({...old, loading: !old.loading})))
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
      <LoaderComponent loading={data.loading}/>
      <div ref={ref}/>
    </div>
  )
}

export default FavoriteFeed;
