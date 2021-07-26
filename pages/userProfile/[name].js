import Meta from "../../components/Meta";
import Header from "../../components/Header";
import AccountProfile from "../../components/PageProfile/AccountProfile";
import React from "react";
import {redirectToLogin} from "../../lib/utils/auth";
import Footer from "../../components/Footer";

function AccountProfilePage({isAuthenticated}) {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <AccountProfile/>
        <Footer  className={"footer"}/>
      </main>
    </>
  )
}
export async function getServerSideProps({req, res}) {
  return redirectToLogin(req.cookies.token);
}
export default AccountProfilePage;