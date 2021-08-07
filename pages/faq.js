import React from 'react';
import {Header} from "../containers/header";
import Feed from "../containers/feed";
import Footer from "../containers/footer";
import Index from "../components/FAQ";

const Faq = () => {
    return (
        <div>
            <Header/>
            <Index/>
            <Footer/>
        </div>
    )
}

export default Faq;