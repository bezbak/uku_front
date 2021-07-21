import Meta from "../components/Meta";
import Header from "../components/Header";
import PageProfile from "../components/PageProfile";
import React from "react";
import EditProfileForm from "../components/PageProfile/EditProfileForm";
import {redirectToLogin} from "../lib/utils/auth";
import Footer from "../components/Footer";

function ProfilePage({isAuthenticated}) {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <EditProfileForm/>
        <PageProfile/>
        <Footer  className={"footer"}/>
      </main>
    </>
  )
}
// export async function getServerSideProps({req, res}) {
//   return redirectToLogin(req.cookies.token);
// }
export default ProfilePage;