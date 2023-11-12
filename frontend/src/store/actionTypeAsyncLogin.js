import { createAsyncThunk } from "@reduxjs/toolkit";
import getApiUser from "../api/fetchApiUser";
const actionTypeAsyncLogin = createAsyncThunk("user/datauser", async () => {
  const dataUserCurr = await getApiUser();
  // console.log("data user fetch api >>>>>", dataUserCurr);

  if (dataUserCurr === undefined) {
    // throw Error => rejected at extraReducers in useSlice will recived
    throw new Error("Failed to fetch user data");
  }

  return dataUserCurr?.data;
});

export default actionTypeAsyncLogin;
