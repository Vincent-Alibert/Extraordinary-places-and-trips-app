import axios from "../../config/api";

/**
 * Soumet un rêve en base de données
 * @param {objet} values
 * @returns promise
 */
export default function submitDream(values) {
  return axios.post("api/v1/dreams/create", values);
}
