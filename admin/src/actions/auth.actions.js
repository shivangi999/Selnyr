import { authConstants } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";


export const login = (user) => dispatch => {

    // console.log(user);

    axios
    .post("/api/admin/signin", user)
    .then(res => {

      // console.log(res);
      //Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //save to localStorage
      setAuthToken(token);

      //Decode token to get user data
      const decoded = jwt_decode(token);

      //set current User
      dispatch(setCurrentUser(decoded));


    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      // console.log(err),
    );

}
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const signout = () => dispatch =>{

      //Remove token from LOcal Storage
      localStorage.removeItem("jwtToken");

      // Remove token from local Storage
      setAuthToken(false);

      // Set current user tp empty object{} which will set is Authenticated
      dispatch(setCurrentUser({}));

        // dispatch({ type: authConstants.LOGOUT_REQUEST });
        // const res = await axios.post(`/admin/signout`);
        //
        // if(res.status === 200){
        //     localStorage.clear();
        //     dispatch({ type: authConstants.LOGOUT_SUCCESS });
        // }else{
        //     dispatch({
        //         type: authConstants.LOGOUT_FAILURE,
        //         payload: { error: res.data.error }
        //     });
        // }

}
