import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import { registerLicense } from "@syncfusion/ej2-base";
import { transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

registerLicense(import.meta.env.VITE_SYNCFUSION_KEY);

const options = {
  position: "bottom right",
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
