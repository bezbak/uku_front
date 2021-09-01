import React, {useEffect, useRef, useState} from 'react';
import Card from "../components/Card";
import styles from './styles.module.scss'
import {getCards} from "../util/getCards";
import {cb, options} from "../util/interSectionObserver";
import {mainFeed} from "../components/Card/state";
import {useRecoilState} from "recoil";
import Heart from '../public/icons/Heart.svg'

const Mainfeed = () => {
  const [data, setData] = useRecoilState(mainFeed)
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