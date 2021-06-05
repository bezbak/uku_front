import Meta from "../components/Meta";
import Container from "../containers";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <Nav/>
        <Container>
          <Main/>
        </Container>
        <Footer/>
      </main>
    </>
  )
}

export default Home