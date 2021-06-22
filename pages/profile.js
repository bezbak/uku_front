import Meta from "../components/Meta";
import Header from "../components/Header";
import PageProfile from "../components/PageProfile";

function ProfilePage() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <PageProfile/>
      </main>
    </>
  )
}

export default ProfilePage;