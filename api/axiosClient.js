import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/QLNT-Server",
  headers: {
    "content-type": "application/json",
  },
});
// axiosClient.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// axiosClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
export default axiosClient;
