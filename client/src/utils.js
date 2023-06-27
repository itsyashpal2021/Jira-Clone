import axios from "axios";

// Add a response interceptor to manage the request
axios.interceptors.response.use(
  (response) => response.data,
  (error) => error.response.data
);

const nodeUrl = "http://localhost:8080";
export const postToNodeServer = async (route, body, config = {}) => {
  const response = await axios.post(nodeUrl + route, body, config);
  return response;
};
