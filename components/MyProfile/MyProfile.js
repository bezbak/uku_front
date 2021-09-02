import styles from './styles.module.scss'
import uku from '/util/HTTP_Agent'
import {endpoints} from "../../api/endpoints";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {useRouter} from "next/router";
import Card from "../Card";
import {cb, options} from "../../util/interSectionObserver";
import {useRecoilState} from "recoil";
import {myProfileFeed} from "../Card/state";
import {getMyProfileInfo} from "./getMyProfileInfo";
import MyProfileInfo from "./MyProfileInfo";
import {getMyProfileFeed} from "./getMyProfileFeed";


const MyProfile = () => {
  const [profile, setProfile] = useState("")
  const [data, setData] = useRecoilState(myProfileFeed)
  const ref = useRef(null)

  useEffect(() => {
    getMyProfileInfo().then(res => res.json().then(data => setProfile(data)))
  }, [])

  useEffect(() => {
    getMyProfileFeed(data.currentPage).then(json => {
      if (json.results !== undefined) {
        setData(old => ({...old, ...json, results: [...old.results, ...json.results]}))
      }
    })
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
    <div className={classNames(styles.profilePage, "container")}>
      <MyProfileInfo profile={profile}/>
      <div>
        <h1>Мои публикации</h1>
        <div className={styles.feed}>
          <Card
            width={"280px"}
            cards={data.results}
            setRecoilState={setData}
          />
        </div>
        <div ref={ref}/>
      </div>
    </div>
  )
}

export default MyProfile;