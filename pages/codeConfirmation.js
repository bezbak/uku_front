import Meta from "../components/Meta";
import Login from "../components/Login";
import CodeConfirmation from "../components/CodeConfirmation";

function CodeConform() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Login>
          <CodeConfirmation/>
        </Login>
      </main>
    </>
  )
}
export default CodeConform;