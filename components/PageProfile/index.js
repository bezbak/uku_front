import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions as profileAction, actions} from "../../public/store/profile/slice";
import Container from "../../containers";
import Nav from "../Nav";
import Footer from "../Footer";
import Profile from "../PageProfile/Profile";
import NavContainer from "../../containers/NavContainer";
import Card from "../Card";
import EditProfileForm from "./EditProfileForm";
import UserPublicationEdit from "./UserPublicationEdit";
import styles from './styles.module.scss'

function PageProfile() {
  const [editPublication, setEditPublication] = useState(false)
  const [toEditPublicationId, setToEditPublicationId] = useState()
  const dispatch = useDispatch();
  // const profileRequest = () => dispatch(profileAction.profileRequestStart());
  const publicationRequest= () => dispatch(actions.publicationRequestStart());
  const feedRequestStart= () => dispatch(actions.feedRequestStart());

  useEffect(()=>{
    // profileRequest()
    publicationRequest()
    feedRequestStart()
  })
  const userProfile = useSelector((store) => store.profile?.userProfile, shallowEqual);
  const userPublication = useSelector((store) => store.profile.userPublications,shallowEqual);
  const userPublicationFeed = useSelector((store) => store.profile.feed,shallowEqual);
  return (
    <>
      <NavContainer>
        <Nav/>
      </NavContainer>
      <Container>
        <div className={styles.profile__content}>
          <Profile user={userProfile}/>
          <EditProfileForm/>
          {editPublication && <UserPublicationEdit setEditPublication={setEditPublication} editPublicationId={toEditPublicationId}/>}
          {!editPublication &&
          <div className={styles.profile__publication}>
            <div className={styles.profile__publication__title}>
              <span>
              Публикации
              </span>
            </div>
            <div className={styles.profile__publication__container}>
              {
                userPublicationFeed?.results?.map((user, index) =>
                  <Card slideData={user} key={index} publication={true}
                        setToEditPublicationId={setToEditPublicationId}
                        setEditPublication={setEditPublication}
                />
                )
              }
            </div>
          </div>}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default PageProfile;