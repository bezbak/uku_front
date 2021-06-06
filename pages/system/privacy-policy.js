import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Container from "../../containers";
import PrivacyPolicy from "../../components/PrivacyPolicy";

function PrivacyPolicyPage() {
  return (
    <>
      <Meta/>
      <div className="home">
        <Header/>
        <Nav/>
        <Container>
          <PrivacyPolicy/>
        </Container>
        <Footer className={"footer"}/>
      </div>
    </>
  )
}

export default PrivacyPolicyPage