import Meta from "../components/Meta";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageFavorites from "../components/PageFavorites";
import NavContainer from "../containers/NavContainer";
import React from "react";
import {redirectToLogin} from "../lib/utils/auth";

function Favorites() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <NavContainer>
          <Nav/>
        </NavContainer>
        <PageFavorites/>
        <Footer className={"footer"}/>
      </main>
    </>
  )
}
// export async function getServerSideProps({req, res}) {
//   return redirectToLogin(req.cookies.token);
// }
export default Favorites