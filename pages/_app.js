import '/styles/global.scss'
import 'react-phone-input-2/lib/style.css'
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'swiper/swiper-bundle.css';
import "swiper/components/pagination/pagination.min.css"
import {ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {RecoilRoot} from "recoil";
import MobileHeader from "../components/MobileHeader";

export default function App({Component, pageProps}) {

  useEffect(() => {
    if (window.localStorage.getItem("token") === "") {
      window.localStorage.removeItem("token")
    }
  }, [])

  return (
    <React.Fragment>
      <RecoilRoot>
        <MobileHeader/>
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
        limit={1}
      />
    </React.Fragment>
  )
}
