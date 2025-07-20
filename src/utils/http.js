import axios from "axios";
// import { resetAuthStatus } from "./AuthBus";


// //https://sinodiback.onrender.com/

const axiosAuthApi = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefresh = false;
let failQueue = [];

const processqueu = (error, token = null) => {
  failQueue.forEach((req) => {
    if (error) {
      req.reject(error);
    } else {
      req.resolve(token);
    }
  });
  failQueue = [];
};

axiosAuthApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // console.log("🔴 Interceptor Error Status:", error.response.data);
    let originalRequest = error.config;
    // console.log(error.response?.status)

    if (error.response?.status === 401 && !originalRequest._retry) {
      // console.log("🔄 Refresh token attempt...");
      originalRequest._retry = true;

      if (isRefresh) {
        return new Promise(function (resolve, reject) {
          failQueue.push({ resolve, reject });
          console.log('casa');
        }).then(() => axiosAuthApi(originalRequest));
      }

      isRefresh = true;

      try {
        // console.log('hapaa')
        const res = await axios.post("http://localhost:8000/api/auth/refresh/", {}, {
          withCredentials: true, // Kusafirisha cookies ikiwa inahitajika
          headers: {
            'Content-Type': 'application/json', // Hakikisha header ya JSON
          },
        });

        // console.log("🟢 Refresh success:", res);

        isRefresh = false;
        processqueu(null);
        return axiosAuthApi(originalRequest);
      } catch(err) {
        // console.log("❌ Refresh failed. Logging out...");
        isRefresh = false;
        processqueu(err, null);
        // console.error("⚠️ Refresh token expired. Logging out.");
        // console.error(err);

        // resetAuthStatus();

        // console.error("hii ndio erro:", err);

        // TODO: unahitaji logout hapa....

        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAuthApi;
