import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/login`;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(backendUrl, userCredentials);
      return response.data; // Devolvemos directamente la respuesta del backend
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Manejo de errores más robusto
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isAuthenticated: false, // Nuevo estado para indicar si está autenticado
    user: null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // Marcar como autenticado al iniciar sesión correctamente
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Usar el payload para el mensaje de error
      });
  }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
