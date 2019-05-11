import axios from "../../config/api";
import actions from "../index-types";

export default function setCurrentUser(data, leaveError, callback) {
  return function(dispatch) {
    axios
      .post("api/v1/users/login", data)
      .then(respUser => {
        dispatch({
          type: actions.SET_USER,
          payload: respUser.data
        });
        callback();
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          leaveError(error.response.data.error);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          leaveError("Une erreur est survenue pendant la requête");
        } else {
          // Something happened in setting up the request that triggered an Error
          leaveError("Une erreur est survenue");
        }
      });
  };
}
