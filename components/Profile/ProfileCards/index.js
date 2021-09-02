import React, {useEffect, useRef} from 'react';
import {getProfileCards} from "./functions";
import Card from "../../Card";
import styles from './styles.module.scss'
import classNames from "classnames";
import {useRecoilState, useResetRecoilState} from "recoil";
import {profileFeed} from "../../Card/state";
import {cb, options} from "../../../util/interSectionObserver";
import {fetchFollow} from "../../Card/CardHead/CardHead";
import {toast} from "react-toastify";

const ProfileCards = ({profile, setProfile}) => {
  const [data, setData] = useRecoilState(profileFeed)
  const resetProfileFeed = useResetRecoilState(profileFeed)
  const ref = useRef(null)


  useEffect(() => {
    resetProfileFeed()
  }, [])

  useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    getProfileCards(id, data.currentPage).then(response => setData(old => ({
      ...old, ...response,
      results: [...old.results, ...response.results]
    })))
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

  if (!data) return <div>...</div>

  function onClickFollowProfile() {
    fetchFollow(window.location.pathname.split("/").pop()).then(res => res.json().then(json => {
      toast.info(json.message)
      setProfile(old => ({...old, following: !old.following}))
    }))
  }

  return (
    <div className={'container'}>
      <h1>Публикации</h1>
      <div className={classNames(styles.profileFeedTitle)}>
        <button onClick={() => onClickFollowProfile()}>{profile.following ? "Отписаться" : "Подписаться"}</button>
      </div>
      <div className={styles.profileFeed}>
        <Card
          cards={data.results}
          width={"280px"}
          setRecoilState={setData}
        />
      </div>
      <div ref={ref}/>
    </div>

  )
}

export default ProfileCards;