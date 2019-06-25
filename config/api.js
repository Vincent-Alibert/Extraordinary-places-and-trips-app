// Fichier créant une instance d'axios avec des params pas défauts
import axios from "axios";

// function getCookie(cname) {
//   const name = cname + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
//const token = getCookie("tokenv3");

/**
 * Configure les paramètres par default d'axios
 */
export default axios.create({
  baseURL: "http://192.168.43.171:5000/",
  // baseURL: "http://192.168.43.171:5000/",
  headers: {
    "Content-Type": "application/json"
  }
});
