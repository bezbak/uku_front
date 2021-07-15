import Meta from "../components/Meta";
import Container from "../containers";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import NavContainer from "../containers/NavContainer";

function Home() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <NavContainer>
          <Nav/>
        </NavContainer>
        <Container>
          <Main/>
        </Container>
        <Footer className={"footer"}/>
      </main>
    </>
  )
}

export default Home