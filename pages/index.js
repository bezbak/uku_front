import Meta from "../components/Meta";
import Login from "../components/Login";
import RegistrationForm from "../components/RegistrationForm";

function Home() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Login>
          <RegistrationForm/>
        </Login>
      </main>
    </>
  )
}

export default Home