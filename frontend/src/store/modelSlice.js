import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actionFetchCategory from "./actionTypeAsync";
export const appSlice = createSlice({
  name: "category",
  initialState: {
    isShowModel: false,
  },
  reducers: {
    acionShowModel: (state, action) => {
      state.isShowModel = action.payload.isShowModel;
    },
  },
});

// Action creators are generated for each case reducer function
export const { acionShowModel } = appSlice.actions;

export default appSlice.reducer;
