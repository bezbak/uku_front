import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/profile/slice";
import Container from "../../containers";
import Nav from "../Nav";
import Footer from "../Footer";
import Profile from "../PageProfile/Profile";
import NavContainer from "../../containers/NavContainer";
import Card from "../Card";
import UserPublicationEdit from "./UserPublicationEdit";
import styles from './styles.module.scss'

function PageProfile() {
  const [editPublication, setEditPublication] = useState(false)
  const [toEditPublicationId, setToEditPublicationId] = useState()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profileRequest = () => dispatch(actions.profileRequestStart())
  const publicationRequest = (page) => dispatch(actions.publicationRequestStart(page));
  const handleScroll = (event) => {
    const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
    if (( scrollTop + clientHeight > scrollHeight - 1) && (pageCount /12) >=page) {
      setPage(prev => prev + 1);
    }
  }

  useEffect(() => {
    profileRequest();
  },[])

  useEffect(() => {
    setLoading(true)
    publicationRequest(page)
    setLoading(false)
  },[page])

  const userProfile = useSelector((store) => store.profile?.userProfile);
  const userPublication = useSelector((store) => store.profile.userPublications, shallowEqual);

  return (
    <>
      <NavContainer>
        <Nav/>
      </NavContainer>
      <Container>
        <div className={styles.profile__content}>
          <Profile user={userProfile}/>
          {editPublication &&
          <UserPublicationEdit setEditPublication={setEditPublication} editPublicationId={toEditPublicationId}/>}
          {!editPublication &&
          <div className={styles.profile__publication}>
            <div className={styles.profile__publication__title}>
              <span>
              Публикации
              </span>
            </div>
            <div className={styles.profile__publication__container} onScroll={handleScroll}>
              {
                userPublication?.results?.map((user, index) =>
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
      <Footer/>
    </>
  )
}

export default PageProfile;