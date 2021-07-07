import {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Meta from "../components/Meta";
import Container from "../containers";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import NavContainer from "../containers/NavContainer";
import {actions as profileAction} from "../public/store/profile/slice";

function Home() {
  const dispatch = useDispatch();
  const is_profile_completed = useSelector((store) => store.auth.is_profile_completed, shallowEqual);
  const user_region_detail = useSelector((store) => store.auth.user_region_detail, shallowEqual);
  console.log(user_region_detail)
  const profileRequest = () => dispatch(profileAction.profileRequestStart());
  const avatarRequest = () => dispatch(profileAction.avatarGetRequestStart());
  useEffect(() => {
    if (is_profile_completed || user_region_detail) {
      profileRequest()
      avatarRequest()
    }
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