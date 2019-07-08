import axios from "../../config/api";

export default function getOneDream(id) {
  return axios.get(`api/v1/dreams/view/${id}`);
}
