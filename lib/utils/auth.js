import Cookies from 'cookies';
import pathnames from '../../constants/pathnames';
import config from '../../config';

const getSessionId = (cookie) => {
  const matches = cookie?.match(
    new RegExp(`(?:^|; )${'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? matches[1] : '';
};

export const redirectToLogin = (token) => {
  // const sessionId = getSessionId(token);
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: pathnames.search,
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
  fetch(`${config.apiUrl}location/`)
    .then(async (response) => response.headers)
    .catch((e) => {
      console.error(e);
      return null;
    });

export const setCookie = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  var cookie = Cookie.parse(ctx.req.headers.cookie || '');
  const csrftoken = cookies.get('csrftoken')
  const headers = await fetchHeaders();
  if (!csrftoken && headers) {
    cookies.set('csrftoken', headers.get('set-cookie'), {
      httpOnly: true,
    });
  }
};
