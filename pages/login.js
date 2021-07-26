import Meta from "../components/Meta";
import Login from "../components/Login";
import AuthForm from "../components/Auth";

function Logining() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Login>
          <AuthForm/>
        </Login>
      </main>
    </>
  )
}

export default Logining