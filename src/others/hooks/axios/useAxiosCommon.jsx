import axios from "axios";

const commonApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
export default function useAxiosCommon() {
  return commonApi;
}
