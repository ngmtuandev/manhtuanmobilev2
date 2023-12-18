import { createAsyncThunk } from "@reduxjs/toolkit";
import getApiUser from "../api/fetchApiUser";
const actionTypeAsyncLogin = createAsyncThunk("user/datauser", async () => {
  const dataUserCurr = await getApiUser();

  if (dataUserCurr === undefined) {
    throw new Error("Failed to fetch user data");
  }

  return dataUserCurr?.data;
});

export default actionTypeAsyncLogin;
