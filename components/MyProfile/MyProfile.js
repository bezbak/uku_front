import styles from './styles.module.scss'
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Card from "../Card";
import {options} from "../../util/interSectionObserver";
import {useRecoilState} from "recoil";
import {myProfileFeed} from "../Card/state";
import {getMyProfileInfo} from "./getMyProfileInfo";
import MyProfileInfo from "./MyProfileInfo";
import {getMyProfileFeed} from "./getMyProfileFeed";


const MyProfile = () => {
  const [profile, setProfile] = useState({
    updated: false
  })
  const [{data, loading, currentPage}, setData] = useRecoilState(myProfileFeed)
  const ref = useRef(null)

  useEffect(() => {
    getMyProfileInfo().then(res => res.json().then(data => setProfile(old => ({...old, ...data}))))
  }, [profile.updated])

  useEffect(() => {
    getMyProfileFeed(currentPage).then(response => {
      setData(old => ({...old, data: {next: response.next, results: [...old.data.results, ...response.results]}}))
    })
  }, [currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && data?.next && !loading) {
        setData(old => ({...old, currentPage: old.currentPage + 1}))
      }
    }, options)
    if (ref && ref.current && data.next) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [data?.next])

  return (
    <div className={classNames(styles.profilePage, "container")}>
      <MyProfileInfo
        profile={profile}
        setProfile={setProfile}
      />
      <div className={styles.myProfileFeed}>
        <h1>Мои публикации</h1>
        <div className={styles.feed}>
          <Card
            width="30%"
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