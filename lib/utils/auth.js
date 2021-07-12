import Cookies from 'cookies';
// eslint-disable-next-line import/named
import pathnames from '../../constants/pathnames';
import config from '../../config';
const getSessionId = (cookie) => {
  const matches = cookie?.match(
    // eslint-disable-next-line no-useless-escape
    // new RegExp(`(?:^|; )${'sessionid'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? matches[1] : '';
};

export const redirectToLogin = (req='') => {
  const sessionId = getSessionId(req?.headers?.cookie);
  const isAuthenticated = Boolean(sessionId);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: pathnames.login,
        permanent: false,
      },
    };
  }

  return {
    props: { isAuthenticated },
  };
};

export const redirectToDashboard = (req) => {
  const sessionId = getSessionId(req?.headers?.cookie);
  const isAuthenticated = Boolean(sessionId);

  if (isAuthenticated) {
    return {
      redirect: {
        destination: pathnames.main,
        permanent: false,
      },
    };
  }

  return {
    props: { isAuthenticated },
  };
};

const fetchHeaders = async () =>
  fetch(`${config.apiUrl}avatar/`)
    .then(async (response) => response.headers)
    .catch((e) => {
      console.error(e);
      return null;
    });

export const setCookie = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  const csrftoken = cookies.get('token')
  const headers = await fetchHeaders();
  if (!csrftoken && headers) {
    cookies.set('csrftoken', headers.get('set-cookie'), {
      httpOnly: false,
    });
  }
};
