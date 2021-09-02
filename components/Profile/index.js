import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {fetchProfile} from "../../util/fetchProfile";
import classNames from "classnames";
import styles from "../MyProfile/styles.module.scss";
import ProfileSocial from "./ProfileSocial";
import Subs from "./Subs";
import ProfileContacts from "./ProfileContacts";
import ProfileCards from "./ProfileCards";

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    fetchProfile(id).then(data => setProfile(data))
  }, [router.query.profile])

  if (!profile) return <div>...</div>

  return (
    <div className={classNames(styles.profilePage, "container")}>
      <div className={styles.profileInfo}>
        <ProfileContacts profile={profile}/>
        <Subs profile={profile}/>
        <ProfileSocial profile={profile}/>
      </div>
      <div className={styles.profileFeedContainer}>
        <ProfileCards profile={profile} setProfile={setProfile}/>
      </div>
    </div>
  )
}

export default Profile;