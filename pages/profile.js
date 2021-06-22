import Meta from "../components/Meta";
import Container from "../containers";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ComponentAds from "../components/Ads";
import Profile from "../components/Profile";
import NavContainer from "../containers/NavContainer";

function ProfilePage() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <NavContainer>
        <Nav/>
      </NavContainer>

        <Container>
          <Profile/>
          <ComponentAds/>
        </Container>
        <Footer className={"footer"}/>
      </main>
    </>
  )
}

export default ProfilePage;