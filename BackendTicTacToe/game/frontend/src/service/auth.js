import Cookies from "universal-cookie";
import decode from "jwt-decode";

const cookies = new Cookies();

const getAuthJwt = () =>
  cookies.get("auth_jwt") ? cookies.get("auth_jwt") : null;

const setAuthJwt = (token) => cookies.set("auth_jwt", token);

const hasLoggedIn = () => getAuthJwt() !== null;

const hasLoggedOut = () => {
  cookies.remove("auth_jwt");
  window.location.reload();
};

const getUser = () => {
  const authJwt = getAuthJwt();
  if (authJwt === null) return null;
  const token = decode(authJwt);
  return token;
};

const getBearerToken = () => `Bearer ${getAuthJwt()}`;

export {
  getAuthJwt,
  setAuthJwt,
  getBearerToken,
  hasLoggedIn,
  getUser,
  hasLoggedOut,
};
