import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const getToken: (counter?: number) => Promise<string> = async (counter = 0) => {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() || "";
  } catch (error) {
    // For testing purposes, return empty string if auth fails
    console.warn("Auth not configured, proceeding without token");
    return "";
  }
};

const axiosInstance = axios.create();

// delay token retrieval until request is made, to avoid making initial request without token
axiosInstance.interceptors.request.use(async (request) => {
  const token = await getToken();
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export { axiosInstance };