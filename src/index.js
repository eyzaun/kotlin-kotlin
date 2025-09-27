import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorker from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Enable PWA install prompts
serviceWorker.register();

