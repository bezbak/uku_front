import Meta from "../components/Meta";
import Login from "../components/Login";
import RegistrationForm from "../components/RegistrationForm";

function Registration() {
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

export default Registration;