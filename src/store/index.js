import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice";
import weatherReducer from "./slices/weatherSlice";
import { loadState, saveState } from "./localstorage.js";
import debounce from "lodash.debounce";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    weather: weatherReducer,
  },
  preloadedState,
});

store.subscribe(
  debounce(() => {
    saveState({
      auth: store.getState().auth,
      todos: store.getState().todos,
      weather: store.getState().weather,
    });
  }, 1000)
);
