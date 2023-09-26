import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getApiCategory from "../api/getApi";
const actionFetchCategory = createAsyncThunk("app/category", async () => {
  const dataCategory = await getApiCategory();
  //   console.log("dataCategory >>>>>", dataCategory);
  return dataCategory?.data;
});

export default actionFetchCategory;
