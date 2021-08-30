import React, {useEffect, useRef, useState} from 'react';
import Card from "../components/Card";
import styles from './styles.module.scss'
import {getFavoriteCards} from "../util/getFavoriteCards";
import {cb, options} from "../util/interSectionObserver";

const FavoriteFeed = () => {
  const [data, setData] = useState({
    results: [],
    currentPage: 1,
    next: null,
    previous: null,
    count: null
  })
  const ref = useRef(null)

  useEffect(() => {
    getFavoriteCards(data.currentPage).then(data => {
      console.log(data)
    })
  }, [data.currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => cb(entry, setData), options)
    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }

  }, [])


  return (
    <div className="container">
      <h2>Избранное</h2>
      <div className={styles.placeholder}/>
      <div className={styles.feed}>
        <Card width={"368px"} cards={data.results}/>
      </div>
      <div ref={ref}/>
    </div>
  )
}

export default FavoriteFeed;