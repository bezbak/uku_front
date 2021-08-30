import React, {useEffect, useRef, useState} from 'react';
import Card from "../components/Card";
import uku from '/adapters/HTTP_Agent'
import {useRecoilState} from "recoil";
import {endpoints} from "../api/endpoints";
import {toast} from "react-toastify";

const Mainfeed = () => {
  const [state, setState] = useState([])
  const ref = useRef(null)

  useEffect(() => {

  }, [])

  return (
    <div className={"container"}>
      <h2>Лента</h2>
      <Card
        width={"320px"}
        cards={[]}
      />
      <div ref={ref}/>
    </div>
  )
}

export default Mainfeed;