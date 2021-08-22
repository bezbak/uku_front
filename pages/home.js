import {Header} from "../containers/header";
import Feed from "../containers/feed";
import Footer from "../containers/footer";
import {useEffect} from "react";
import {getProfileInfo} from "../components/Profile/getProfileInfo";

const Home = () => {
    return (
        <div>
            <Header/>
            <Feed title={"Лента"}/>
            <Footer/>
        </div>
    )
}

export default Home;