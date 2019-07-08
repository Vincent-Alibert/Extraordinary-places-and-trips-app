import axios from "../../config/api";

export default function updateDream(values) {
  return axios.put(`api/v1/dreams/edit/${values.idDream}`, values);
}
