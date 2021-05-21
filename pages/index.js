import Meta from "../src/components/Meta";
import Login from "../src/components/Login";
import AuthForm from "../src/components/Auth";
import CodeConfirmation from "../src/components/CodeConfirmation";

function Home() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Login>
          <CodeConfirmation/>
          {/*<AuthForm/>*/}
        </Login>
      </main>
    </>
  )
}

export default Home