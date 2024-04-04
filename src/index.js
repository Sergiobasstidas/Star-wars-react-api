import React from "react";
import App from "./Components/App";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import starWarsReducer from "./redux/starWarsState";

const store = configureStore({
  reducer: {
    starWars: starWarsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const root = document.getElementById("root");
const rootElement = createRoot(root);

rootElement.render(
  <Provider store={store}>
    <App />
  </Provider>
);
