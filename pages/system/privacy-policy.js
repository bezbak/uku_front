import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Container from "../../containers";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import NavContainer from "../../containers/NavContainer";

function PrivacyPolicyPage() {
  return (
    <>
      <Meta/>
      <div className="home">
        <Header/>
        <NavContainer>
          <Nav/>
        </NavContainer>
        <Container>
          <PrivacyPolicy/>
        </Container>
        <Footer className={"footer"}/>
      </div>
    </>
  )
}

export default PrivacyPolicyPage