import '/styles/global.scss'
import 'react-phone-input-2/lib/style.css'
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'swiper/swiper-bundle.css';
import "swiper/components/pagination/pagination.min.css"
import {ToastContainer} from "react-toastify";
import React from "react";
import {RecoilRoot} from "recoil";

export default function App({Component, pageProps}) {
    return (
        <React.Fragment>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
            <ToastContainer
                position="top-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </React.Fragment>
    )
}
