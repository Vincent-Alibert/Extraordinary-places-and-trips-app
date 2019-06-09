import axios from "../../config/api";

export default function submitDream(values) {
  return axios.post("api/v1/dreams/create", values);
}
