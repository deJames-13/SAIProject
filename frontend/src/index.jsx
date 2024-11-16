import 'regenerator-runtime/runtime';
import "./index.css";

import { StyledEngineProvider } from '@mui/material/styles';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "./context";

import React from "react";
import store from 'states/store';
import App from "./App";

// React Context Provider

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </Provider>
);
