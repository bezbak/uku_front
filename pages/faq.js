import React from 'react';
import {Header} from "../containers/header";
import Feed from "../containers/feed";
import Footer from "../containers/footer";
import FAQBody from "../components/FAQ/FAQBody";

const Faq = () => {
    return (
        <div>
            <Header/>
            <FAQBody/>
            <Footer/>
        </div>
    )
}

export default Faq;