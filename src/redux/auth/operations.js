import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    console.error("Logout error:", error.response?.data);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/current");
      return res.data;
    } catch (error) {
      console.error("Refresh error:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
