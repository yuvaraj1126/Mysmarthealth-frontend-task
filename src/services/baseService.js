import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export class BaseService {
  constructor() {
    this.httpClient = axios.create({ baseURL: BASE_URL });

    this.httpClient.interceptors.request.use((request) => {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    });

    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
