import axiosClient from "./axiosClient";

const authApi = {
  login: (email, password) => {
    const url = "/login";
    return axiosClient.post(url, { email, password });
  },

  fetchUser: () => {
    const url = "/me";
    return axiosClient.get(url);
  },
};

export default authApi;
