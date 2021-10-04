import React, {useEffect, useRef} from 'react';
import Card from "../components/Card";
import styles from './styles.module.scss'
import {getCards} from "../util/getCards";
import {cb, options} from "../util/interSectionObserver";
import {mainFeed} from "../components/Card/state";
import {useRecoilState, useResetRecoilState} from "recoil";
import classNames from "classnames";
import Loader from "../components/Loader";


const Mainfeed = () => {
  const [data, setData] = useRecoilState(mainFeed)
  const resetMainfeed = useResetRecoilState(mainFeed)

  const ref = useRef(null)
  useEffect(() => {
    resetMainfeed()
  }, [])

  useEffect(() => {
    if (data.next !== null) {
      setData(old => ({...old, loading: !old.loading}))
      getCards(data.currentPage).then(data => {
        setData(old => ({...old, next: data.next}))
        if (data.results && data.results.length) {
          setData(old => ({
            ...old,
            results: old.results.concat(data.results),
          }))
        }
      }).finally(() => {
        setData(old => ({...old, loading: !old.loading}))
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
    <div className={classNames("container", styles.mainfeed)}>
      <h2>Лента</h2>
      {data.results.length ? null : <div className={styles.placeholder}/>}
      <div className={styles.feed}>
        <Card
          width={"368px"}
          cards={data.results}
          setRecoilState={setData}
        />
      </div>
      <Loader loading={data?.loading}/>
      <div ref={ref}/>
    </div>
  )
}

export default Mainfeed;