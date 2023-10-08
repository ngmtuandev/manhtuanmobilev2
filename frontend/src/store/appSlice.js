import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actionFetchCategory from "./actionTypeAsync";
export const appSlice = createSlice({
  name: "category",
  initialState: {
    categories: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Peding ...
    builder.addCase(actionFetchCategory.pending, (state, action) => {
      state.categories = [];
      state.payload = false;
    });

    // full fill ...
    builder.addCase(actionFetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.payload = true;
      //   console.log("categories >>>>", state.categories);
    });

    // erorr
    builder.addCase(actionFetchCategory.rejected, (state, action) => {
      state.categories = null;
      state.payload = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = appSlice.actions;

export default appSlice.reducer;
