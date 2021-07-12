import Meta from "../components/Meta";
import Header from "../components/Header";
import PageProfile from "../components/PageProfile";
import React from "react";
import EditProfileForm from "../components/PageProfile/EditProfileForm";
import {redirectToLogin} from "../lib/utils/auth";
// import EditProfileForm from "../components/PageProfile/EditProfileForm";

function ProfilePage() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <EditProfileForm/>
        <PageProfile/>
      </main>
    </>
  )
}
// export async function getServerSideProps({ req }) {
//   return redirectToLogin(req);
// }
export default ProfilePage;