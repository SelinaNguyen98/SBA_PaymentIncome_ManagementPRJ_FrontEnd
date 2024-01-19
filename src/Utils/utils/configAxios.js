import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

export const paths = {
  LOGIN: "auth/login",
  GET_PAYMENTS_MONTH_YEAR: "payments",
  PAYMENT: "payments",
  EXCHAGE_RATE: "exchangeRate",
  categoriesPL: "categories",
};

// Request interceptor to attach the authentication token to each request
axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// let isRefreshing = false;
// let refreshSubscribers = [];

// Function to set the authentication token to local storage
// const setAuthToken = (token) => {
//   localStorage.setItem("token", token);
// };

// KHÚC BÊN DƯỚI DÙNG ĐỂ REFESH TOKEN KHÔNG RÕ AI LÀM // TODO //
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to an expired token
//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // If a token refresh is already in progress, add the original request to the subscribers
//         return new Promise((resolve) => {
//           refreshSubscribers.push((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(axios(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;
//       originalRequest._retry = true;

//       // Perform the token refresh request
//       return new Promise((resolve, reject) => {
//         // Replace this with your actual code to refresh the authentication token
//         axios
//           .post("auth/refresh")
//           .then((response) => {
//             const newAuthToken = response.data.access_token;
//             // Update the stored token with the new one
//             setAuthToken(newAuthToken);

//             // Update the Authorization header with the new token
//             originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;

//             // Resolve the original request
//             resolve(axios(originalRequest));
//           })
//           .catch((err) => {
//             // Handle token refresh failure (e.g., redirect to login)
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//             refreshSubscribers = [];
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
