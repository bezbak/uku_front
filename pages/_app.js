import React, {useEffect} from 'react';
import Head from 'next/head';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {ToastProvider, useToasts} from 'react-toast-notifications'
import SwiperCore, {Navigation,Autoplay, Pagination, Scrollbar, A11y} from 'swiper';
import {wrapper} from '../store/index';
import {actions} from '../store/main/slice';
import '../public/styles/global.scss'
import '../public/styles/phoneInput.scss'
import {setCookie} from '../lib/utils/auth';
import 'swiper/components/pagination/pagination.scss';
import {actions as toastAction} from "../store/toast/slice";

SwiperCore.use([Navigation, Pagination, Autoplay,Scrollbar, A11y]);
// function LoadDiffData() {
//   const dispatch = useDispatch();
//
//   React.useEffect(() => {
//     dispatch(actions.loadDifferentData());
//   }, []);
//
//   return null;
// }

function Toast () {
  const {addToast} = useToasts();
  const dispatch = useDispatch();
  const toast = useSelector((store) => store.toast, shallowEqual);
  const removeToast = () => dispatch(toastAction.removeSnackbar());
  useEffect(() => {
    if (toast.open) {
      addToast(
        toast.message, {
          appearance: toast.variant,
          autoDismiss: true,
        });
      removeToast()
    }
  }, [toast]);
  return null
}

function App({Component, pageProps}) {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ToastProvider  placement="top-center">
      <Head>
        <title>Uku.kg</title>
        <meta name="theme-color"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Toast/>
      {/*{pageProps?.isAuthenticated && <LoadDiffData/>}*/}
      <Component {...pageProps} />
    </ToastProvider>
  );
}


export default wrapper.withRedux(App);
