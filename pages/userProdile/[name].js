import Meta from "../../components/Meta";
import Header from "../../components/Header";
import PageProfile from "../../components/PageProfile";
import React from "react";
import {redirectToLogin} from "../../lib/utils/auth";

function UserProfilePage({isAuthenticated}) {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <PageProfile/>
      </main>
    </>
  )
}
export async function getServerSideProps({req, res}) {
  return redirectToLogin(req.cookies.token);
}
export default UserProfilePage;