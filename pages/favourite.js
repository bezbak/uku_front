import {Header} from "../containers/header";
import Feed from "../containers/feed";
import Footer from "../containers/footer";

const Favourite = () => {
    return (
        <div>
            <Header/>
            <Feed title={"Избранное"}/>
            <Footer/>
        </div>
    )
}

export default Favourite;