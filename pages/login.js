import Meta from "../components/Meta";
import Login from "../components/Login";
import AuthForm from "../components/Auth";

function Home() {
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

export default Home