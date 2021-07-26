import React from "react";
import Meta from "../components/Meta";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageSearch from "../components/PageSearch";
import NavContainer from "../containers/NavContainer";
import { redirectToLogin } from '../lib/utils/auth';

function Search() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <NavContainer>
          <Nav/>
        </NavContainer>
        <PageSearch/>
        <Footer  className={"footer"} />
      </main>
    </>
  )
}
export async function getServerSideProps({req, res}) {
  return redirectToLogin(req.cookies.token);
}
export default Search