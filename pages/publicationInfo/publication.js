import Meta from "../../components/Meta";
import Header from "../../components/Header";
import AccountProfile from "../../components/PageProfile/AccountProfile";
import React from "react";
import {redirectToLogin} from "../../lib/utils/auth";
import PagePublication from "../../components/PagePublication";
import NavContainer from "../../containers/NavContainer";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

function AccountProfilePage({isAuthenticated}) {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <NavContainer>
          <Nav title={"Кого будем искать"}/>
        </NavContainer>
        <PagePublication/>
        <Footer  className={"footer"} />
      </main>
    </>
  )
}
export async function getServerSideProps({req, res}) {
  return redirectToLogin(req.cookies.token);
}
export default AccountProfilePage;