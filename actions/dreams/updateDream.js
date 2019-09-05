import axios from "../../config/api";

/**
 * met à jour un rêve en base de données
 * @param {objet} values
 * @returns promise
 */
export default function updateDream(values) {
  return axios.put(`api/v1/dreams/edit/${values.idDream}`, values);
}
