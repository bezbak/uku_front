import Meta from "../src/components/Meta";
import Login from "../src/components/Login";
import AuthForm from "../src/components/Auth";
import CodeConfirmation from "../src/components/CodeConfirmation";
import RegistrationForm from "../src/components/RegistrationForm";

function Home() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Login>
          <RegistrationForm/>
          {/*<CodeConfirmation/>*/}
          {/*<AuthForm/>*/}
        </Login>
      </main>
    </>
  )
}

export default Home