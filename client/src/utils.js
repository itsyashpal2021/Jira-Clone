import axios from "axios";

const nodeUrl = "http://localhost:8080";
export const postToNodeServer = async (route, body, config = {}) => {
  const response = await axios.post(nodeUrl + route, body, config);
  console.log(response);
};
