import axios from "../../config/api";
import map from "../../config/map";
import actions from "../index-types";

export default function getAllDreams(leaveError) {
  return function(dispatch) {
    axios
      .get("api/v1/dreams/all")
      .then(respDreams => {
        const listDreams = respDreams.data;
        Promise.all(
          listDreams.map((dream, index) => {
            addressFormated = dream.adress
              .replace(/ /g, "+")
              .replace(/,/g, "%");

            return axios.get(
              `https://www.mapquestapi.com/geocoding/v1/address?key=${
                map.key
              }&inFormat=kvp&outFormat=json&location=${addressFormated}&thumbMaps=false`
            );
          })
        ).then(resp => {
          resp.map((data, i) => {
            listDreams[i].latLng = data.data.results[0].locations[0].latLng;
          });

          dispatch({
            type: actions.GET_ALL_DREAMS_CURRENT_USER,
            payload: listDreams
          });
        });
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
