import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";
import Container from "../../containers";
import NavContainer from "../../containers/NavContainer";

function FrequentlyAskedQuestion() {
  return (
    <>
      <Meta/>
      <div className="home">
        <Header/>
        <NavContainer>
          <Nav/>
        </NavContainer>
        <Container>
          <FAQ/>
        </Container>
        <Footer className={"footer"}/>
      </div>
    </>
  )
}

export default FrequentlyAskedQuestion