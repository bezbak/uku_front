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
  const [{data, loading, currentPage}, setData] = useRecoilState(mainFeed)
  const resetMainfeed = useResetRecoilState(mainFeed)
  const ref = useRef(null)

  useEffect(() => {
    resetMainfeed()
  }, [])

  useEffect(() => {

    setData(old => ({...old, loading: !old.loading}))

    getCards(currentPage).then(response => {
      setData(old => ({
        ...old,
        data: {results: [...old.data.results, ...response.results], next: response?.next ?? null}
      }))
    }).finally(() => setData(old => ({...old, loading: !old.loading})))
  }, [currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && data?.next) {
        setData(old => ({...old, currentPage: old.currentPage + 1}))
      }
    }, options)
    if (ref && ref.current && data.next && !loading) {
      observer.observe(ref.current)
    }
    return () => ref.current ? observer.unobserve(ref.current) : null
  }, [data?.next])

  return (
    <div className={classNames("container", styles.mainfeed)}>
      <h2>Лента</h2>
      {!data.results.length && !loading ? <div className={styles.placeholder}/> : null}
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