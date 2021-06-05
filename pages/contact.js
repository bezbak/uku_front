import Meta from "../components/Meta";
import Login from "../components/Login";
import AuthForm from "../components/Auth";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <>
      <Meta/>
      <div className="home">
        <Header/>
        <Nav/>
        <Contact/>
        <Footer className={"footer"}/>
      </div>
    </>
  )
}

export default ContactPage