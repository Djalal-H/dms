import { AppDispatch } from "@/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "@/store/auth/slice";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

// Hardcoded credentials
const VALID_CREDENTIALS = [
  { email: "user@gmail.com", password: "user" },
  { email: "admin@gmail.com", password: "admin" },
];

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Check credentials
      const validUser = VALID_CREDENTIALS.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (validUser) {
        dispatch(loginSuccess({ email: validUser.email }));
        // store into local storage
        localStorage.setItem(
          "auth",
          JSON.stringify({ email: validUser.email })
        );
        setCookie("auth", JSON.stringify({ email: validUser.email }), {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
        return true;
      } else {
        dispatch(loginFailure("Invalid email or password"));
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(loginFailure("An unexpected error occurred"));
      return false;
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  //delete from local storage
  localStorage.removeItem("auth");
  deleteCookie("auth");
  dispatch(logout());
};

export const hydrateAuthFromCookies = () => (dispatch: AppDispatch) => {
  try {
    const authCookie = getCookie("auth");
    if (authCookie) {
      const userData = JSON.parse(authCookie as string);
      dispatch(loginSuccess(userData));
    }
  } catch (error) {
    deleteCookie("auth", { path: "/" });
  }
};
