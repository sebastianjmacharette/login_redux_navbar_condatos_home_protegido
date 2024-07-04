import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

// Escuchar cambios en el store
store.subscribe(() => {
  console.log('State updated:', store.getState()); // Muestra el estado actualizado cada vez que cambia
});

export default store;
