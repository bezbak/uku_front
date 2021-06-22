import React from "react";
import Container from "../../containers";
import Nav from "../Nav";
import Footer from "../Footer";
import ComponentAds from "../Ads";
import Profile from "../PageProfile/Profile";
import NavContainer from "../../containers/NavContainer";
import EditProfileForm from "./EditProfileForm";
import styles from './styles.module.scss'

function PageProfile() {
  return (
    <>
        <NavContainer>
          <Nav/>
        </NavContainer>
        <Container>
          <div className={styles.content}>
            <EditProfileForm/>
            <ComponentAds/>
          </div>
          {/*<Profile/>*/}

        </Container>
        <Footer className={"footer"}/>
    </>
  )
}

export default PageProfile;