import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Container from "../../containers";
import TermsOfUse from "../../components/TermsOfUse";

function TermsOfUsePage() {
  return (
    <>
      <Meta/>
      <div className="home">
        <Header/>
        <Nav/>
        <Container>
          <TermsOfUse/>
        </Container>
        <Footer className={"footer"}/>
      </div>
    </>
  )
}

export default TermsOfUsePage