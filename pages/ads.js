import Meta from "../components/Meta";
import Container from "../containers";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ComponentAds from "../components/Ads";

function Ads() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <Nav/>
        <Container>
          <Navbar/>
          <ComponentAds/>
        </Container>
        <Footer className={"footer"}/>
      </main>
    </>
  )
}

export default Ads