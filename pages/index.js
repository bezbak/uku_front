import Meta from "../components/Meta";
import Container from "../containers";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import NavContainer from "../containers/NavContainer";
import {useDispatch} from "react-redux";
import {actions} from "../public/store/locations/slice";
import {useEffect} from "react";

function Home() {
  const dispatch = useDispatch();
  const locationRequest = () => dispatch(actions.locationRequestStart());
  useEffect(()=>{
    locationRequest()
  })
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