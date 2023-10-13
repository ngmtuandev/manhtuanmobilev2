import { createAsyncThunk } from "@reduxjs/toolkit";
import getApiUser from "../api/fetchApiUser";
const actionTypeAsyncLogin = createAsyncThunk("user/datauser", async () => {
  const dataUserCurr = await getApiUser();
    console.log("data user fetch api >>>>>", dataUserCurr);
  return dataUserCurr?.data;
});

export default actionTypeAsyncLogin;
