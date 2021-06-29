import React, {useEffect, useState} from "react";
import Container from "../../containers";
import Nav from "../Nav";
import Footer from "../Footer";
import Profile from "../PageProfile/Profile";
import NavContainer from "../../containers/NavContainer";
import styles from './styles.module.scss'
import Card from "../Card";
import {useRouter} from "next/router";
import {useToasts} from "react-toast-notifications";
import useIsMobile from "../../public/hooks/useIsMobile";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../public/store/profile/slice";
import EditProfileForm from "./EditProfileForm";

const sliderData = [
  {
    id: 1,
    name:"Фывова Александра",
    description:'height: 34px;\n' +
      'width: 336px;\n' +
      'left: 0px;\n' +
      'top: 24px;\n' +
      'border-radius: nullpx;\n',
    src: 'images/lenta.png',
    commentCount: 1,
    data:8,
    altInfo: 'shoe',
    slider :[
      {
        id: 2,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 3,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 4,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 5,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      }
    ]
  },
  {
    id: 2,
    src: 'images/lenta.png',
    altInfo: 'shoe',
  },
  {
    id: 3,
    src: 'images/lenta.png',
    altInfo: 'shoe',
  },
  {
    id: 4,
    src: 'images/lenta.png',
    altInfo: 'shoe',  slider :[
      {
        id: 2,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 3,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 4,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 5,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      }
    ]
  },
  {
    id: 5,
    src: 'images/lenta.png',
    altInfo: 'shoe',
    slider :[
      {
        id: 2,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 3,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 4,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      },
      {
        id: 5,
        src: 'images/lenta.png',
        altInfo: 'shoe',
      }
    ]
  }
]
function PageProfile() {
  const {push} = useRouter();
  const {addToast} = useToasts();
  const [value, setValue] = useState()
  const [privacyChecked, setPrivacyChecked] = useState(true)
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const profileRequest = (token) => dispatch(actions.profileRequestStart(token));
  const publicationRequest= (token) => dispatch(actions.publicationRequestStart(token));
  const feedRequestStart= (token) => dispatch(actions.feedRequestStart(token));

  useEffect(()=>{
    profileRequest("LIvrcoHeWF2H3dJ1jRY3KamaFmezJOCzZwK2N0xGDq6oLRhsH7tIP7RcxiheXzOY")
    publicationRequest("LIvrcoHeWF2H3dJ1jRY3KamaFmezJOCzZwK2N0xGDq6oLRhsH7tIP7RcxiheXzOY")
    feedRequestStart("LIvrcoHeWF2H3dJ1jRY3KamaFmezJOCzZwK2N0xGDq6oLRhsH7tIP7RcxiheXzOY")
  })
  const userProfile = useSelector((store) => store.profile?.userProfile, shallowEqual);
  const userPublication = useSelector((store) => store.profile.userPublications,shallowEqual);
  const userPublicationFeed = useSelector((store) => store.profile.feed,shallowEqual);
 console.log(userPublicationFeed)
  return (
    <>
      <NavContainer>
        <Nav/>
      </NavContainer>
      <Container>
        <div className={styles.profile__content}>
          {/*<EditProfileForm/>*/}
          <Profile user={userProfile}/>
          <div className={styles.profile__publication}>
            <div className={styles.profile__publication__title}>
              <span>
              Публикации
              </span>
            </div>
            <div className={styles.profile__publication__container}>
              {
                userPublicationFeed?.results?.map((user,index) =>
                  <Card slideData={user} key={index} publication={true}/>
                )
              }
            </div>
          </div>
        </div>


      </Container>
      <Footer className={"footer"}/>
    </>
  )
}

export default PageProfile;