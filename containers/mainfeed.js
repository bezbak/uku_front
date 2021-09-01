import React, {useEffect, useRef, useState} from 'react';
import Card from "../components/Card";
import styles from './styles.module.scss'
import {getCards} from "../util/getCards";
import {cb, options} from "../util/interSectionObserver";

const Mainfeed = () => {
  const [data, setData] = useState({
    results: [],
    currentPage: 1,
    next: 1,
    previous: null,
    count: null
  })

  const ref = useRef(null)

  useEffect(() => {
    if (data.next !== null) {
      getCards(data.currentPage).then(data => {
        setData(old => ({...old, next: data.next}))
        if (data.results) {
          setData(old => ({
            ...old,
            results: old.results.concat(data.results),
          }))
        }
      })
    }
  }, [data.currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => cb(entry, setData), options)
    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return (
    <div className={"container"}>
      <h2>Лента</h2>
      {data.results.length ? null : <div className={styles.placeholder}/>}
      <div className={styles.feed}>
        <Card
          width={"368px"}
          cards={data.results}
        />
      </div>
      <div ref={ref}/>
    </div>
  )
}

export default Mainfeed;