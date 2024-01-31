import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = "http://localhost:8000/createUser/";

const initialState = {
  userL: [],
  status: "idle",
  error: null,
};

export const addUser = createAsyncThunk("addUser", (payload) => {
  axios.post(`${apiUrl}`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
});

const addUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action) => {
      state.user = action.payload;
    },
    fail: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default addUserSlice.reducer;
export const { add, fail } = addUserSlice.actions;
