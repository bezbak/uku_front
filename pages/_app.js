import React from 'react';
import Head from 'next/head';
import {useDispatch} from 'react-redux';
import {wrapper} from '../public/store/index';
import {actions} from '../public/store/main/slice';
import '../public/styles/global.scss'
import '../public/styles/phoneInput.scss'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {setCookie} from '../public/lib/utils/auth';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function LoadDiffData() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.loadDifferentData());
  }, []);

  return null;
}

function App({Component, pageProps}) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Ubirator upay</title>
        <meta name="theme-color"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      {pageProps?.isAuthenticated && <LoadDiffData/>}
      <Component {...pageProps} />
    </>
  );
}

// App.getInitialProps = async ({ ctx }) => {
//   await setCookie(ctx);
//   return {};
// };

export default wrapper.withRedux(App);
