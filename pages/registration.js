import Meta from "../components/Meta";
import Login from "../components/Login";
import RegistrationForm from "../components/RegistrationForm";
import {redirectToLogin} from "../lib/utils/auth";

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
// export async function getServerSideProps({ req }) {
//   return redirectToLogin(req);
// }
export default Registration;