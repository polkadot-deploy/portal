import axios from "axios";

const api = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    baseURL: "http://localhost:4000",
    withCredentials: true
});

export const deploy = async (obj) => {
    try {
      console.log("OBJECT", obj)
      const response = await api.post("/deploy", obj);
      console.log("RESPONSE", response)
      return response
    } catch (error) {
      throw error;
    }
};

export const projectInfo = async (id) => {
    try {
      const response = await api.get(`/status/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
};

export const apiCheck = async () => {
  try {
    const response = await api.get("/check")
    return response
  } catch (error) {
    throw error
  }
}

export const allDeployments = async () => {
  try {
    const response = await api.get("/deploy/all")
    return response
  } catch (error) {
    throw error
  }
}

export const userDeployments = async (wallet) => {
  try {
    const response = await api.get(`/deploy/${wallet}`)
    return response
  } catch (error) {
    throw error
  }
}