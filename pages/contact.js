import Meta from "../components/Meta";
import Login from "../components/Login";
import AuthForm from "../components/Auth";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Container from "../containers";

function ContactPage() {
  return (
    <>
      <Meta/>
      <div className="home">
        <Header/>
        <Nav/>
        <Container>
          <Contact/>
        </Container>
        <Footer className={"footer"}/>
      </div>
    </>
  )
}

export default ContactPage