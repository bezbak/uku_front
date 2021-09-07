import {Header} from "../containers/header";
import Footer from "../containers/footer";
import Search from "../components/Search";

const CreatePublication = () => {
  return (
    <div>
      <Header/>
      <div className={"container"}>
        <Search createPublication={true}/>
      </div>
      <Footer/>
    </div>
  )
}

export default CreatePublication;