import axios from "../../config/api";

/**
 * récupération d'un rêve
 * @param {string} id
 * @returns promise
 */
export default function getOneDream(id) {
  return axios.get(`api/v1/dreams/view/${id}`);
}
