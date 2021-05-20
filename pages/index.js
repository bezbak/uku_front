import Meta from "../src/components/Meta";
import Login from "../src/components/Login";
import AuthForm from "../src/components/Auth";

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