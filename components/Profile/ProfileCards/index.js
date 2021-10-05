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
import cs from 'classnames'
import {useRouter} from "next/router";

const ProfileCards = ({profile, setProfile}) => {
  const [{data, loading, currentPage}, setData] = useRecoilState(profileFeed)
  const resetProfileFeed = useResetRecoilState(profileFeed)
  const ref = useRef(null)
  const router = useRouter()

  useEffect(() => {
    resetProfileFeed()
  }, [])

  useEffect(() => {
    const {query: {profile}} = router
    getProfileCards(profile, currentPage).then(response => setData(old => ({
      ...old, data: {
        next: response?.next ?? null,
        results: [...old.data.results, ...response.results]
      }
    })))
  }, [currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && data.next && !loading) {
        setData(old => ({...old, currentPage: old.currentPage + 1}))
      }
    }, options)
    if (ref && ref.current && data?.next) {
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

  const subsClass = isSub => cs({
    [styles.subscribed]: isSub,
    [styles.default]: !isSub
  })


  return (
    <div className={'container'}>
      <div className={styles.profileTitle}>
        <h1>Публикации</h1>
        <div className={classNames(styles.profileFeedTitle)}>
          <button
            className={subsClass(profile.following)}
            onClick={() => onClickFollowProfile()}>{profile.following ? "Отписаться" : "Подписаться"}
          </button>
        </div>
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