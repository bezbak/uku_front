import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Container from "../../../containers";
import Nav from "../../Nav";
import Footer from "../../Footer";
import Profile from "../../PageProfile/Profile";
import NavContainer from "../../../containers/NavContainer";
import Card from "../../Card";
import styles from './styles.module.scss'
import {actions as accountAction, actions} from "../../../store/account/slice";
import Button from "../../Button";

function AccountProfile() {
  const dispatch = useDispatch();
  const publicationRequest = () => dispatch(actions.accountPublicationsRequestStart())
  useEffect(() => {
    publicationRequest();
  }, [])
  const accountProfile = useSelector((store) => store.account?.accountProfile);
  const accountPublication = useSelector((store) => store.account.accountPublicationList, shallowEqual);
  const [subscribe, setSubscribe] = useState(accountProfile.following)

  const accountFollow = () => {
    setSubscribe(!subscribe)
    dispatch(accountAction.accountFollowRequestStart({id: accountProfile.id}));
  };
  return (
    <>
      <NavContainer>
        <Nav/>
      </NavContainer>
      <Container>
        <div className={styles.profile__content}>
          <Profile user={accountProfile} userProfile={false}/>
          <div className={styles.profile__publication}>
            <div className={styles.profile__publication__headline}>
              <div className={styles.profile__publication__headline_title}>
                <span>Публикации</span>
              </div>
              <Button className={styles.profile__publication__headline__button}
                      textClassName={styles.profile__publication__headline__button_text}
                      onClick={accountFollow}
              >
                {subscribe ? 'Отписаться' : 'Подписаться'}
              </Button>
            </div>
            <div className={styles.profile__publication__container}>
              {
                accountPublication?.results?.map((user, index) =>
                  <Card slideData={user} key={index} profileCard={true}
                  />
                )
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default AccountProfile;