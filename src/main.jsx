import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import router from "./ALL_CPR/routes/common_routes/Routes.jsx";
import AuthProvider from "./ALL_CPR/context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
