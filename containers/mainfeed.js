import React, {useEffect, useRef, useState} from 'react';
import Card from "../components/Card";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../api/endpoints";
import styles from './styles.module.scss'

const Mainfeed = () => {
  const [state, setState] = useState([])
  const ref = useRef(null)

  useEffect(() => {
    // const token = window.localStorage
    fetch(uku + endpoints.feed + `?page=${1}`, {}).then(r => {
      r.json().then(data => setState(data.results))
    })
  }, [])

  return (
    <div className={"container"}>
      <h2>Лента</h2>
      <div className={styles.feed}>
        <Card
          width={"320px"}
          cards={state}
        />
      </div>
      <div ref={ref}/>
    </div>
  )
}

export default Mainfeed;