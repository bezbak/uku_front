import Meta from "../../components/Meta";
import Login from "../../components/Login";
import AuthForm from "../../components/Auth";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Container from "../../containers";
import NavContainer from "../../containers/NavContainer";

function ContactPage() {
  return (
    <>
      <Meta/>
      <div className="home">
        <Header/>
       <NavContainer>
         <Nav/>
       </NavContainer>
        <Container>
          <Contact/>
        </Container>
        <Footer className={"footer"}/>
      </div>
    </>
  )
}

export default ContactPage