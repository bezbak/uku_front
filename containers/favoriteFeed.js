import React, {useEffect, useRef} from 'react';
import Card from "../components/Card";
import styles from './styles.module.scss'
import {getFavoriteCards} from "../util/getFavoriteCards";
import {cb, options} from "../util/interSectionObserver";
import {favoriteFeed} from "../components/Card/state";
import {useRecoilState, useResetRecoilState} from "recoil";
import {getCards} from "../util/getCards";
import {value} from "lodash/seq";

const FavoriteFeed = () => {
  const [data, setData] = useRecoilState(favoriteFeed)
  const resetFavorite = useResetRecoilState(favoriteFeed)
  const ref = useRef(null)

  useEffect(() => {
    resetFavorite()
  }, [])

  useEffect(() => {
    getFavoriteCards(data.currentPage).then(res => res.json().then(value => {
      if (value.results !== undefined) {
        setData(old => ({
          ...old,
          ...value,
          results: [...old.results, ...value.results],
        }))
      }
    }))
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
    <div className="container">
      <h2>Избранное</h2>
      {data.results.length ? null : <div className={styles.placeholder}/>}
      <div className={styles.feed}>
        <Card width={"368px"}
              cards={data.results}
              setRecoilState={setData}
              page={"favorite"}
        />
      </div>
      <div ref={ref}/>
    </div>
  )
}

export default FavoriteFeed;
