import axios from "axios";
import { useEffect } from "react";

export default function useAxiosSecure() {
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // You can modify the request config before sending the request
        console.log("Request:", config);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        // Modify response data before resolving
        // For example, parse JSON response
        console.log("Yes I check this");
        return response;
      },
      (error) => {
        // Handle response error
        // For example, log error or show error message
        console.error("Response Error:", error);

        // Log out the user if the error status is 401 (unauthorized)
        // if (error.response && error.response.status === 401) {
        //   // Call your logout function here or perform logout logic
        //   logOut(); // Example: Call logout function
        // }

        return Promise.reject(error);
      }
    );

    // Cleanup function
    return () => {
      // Eject response interceptor
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  // Component JSX
  return axiosSecure;
}
