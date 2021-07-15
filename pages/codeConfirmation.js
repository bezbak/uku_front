import Meta from "../components/Meta";
import Login from "../components/Login";
import CodeConfirmation from "../components/CodeConfirmation";
import {redirectToLogin} from "../lib/utils/auth";

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