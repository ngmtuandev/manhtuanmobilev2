import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actionTypeAsyncLogin from "./actionTypeAsyncLogin";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    isLogin: false,
    isLoading: false,
    dataUser: "",
    messExpiToken: "",
  },
  reducers: {
    login: (state, action) => {
      console.log("action >>>", action);
      state.token = action?.payload?.accessToken;
      state.isLogin = true;
    },
    logout: (state, action) => {
      state.token = null;
      state.isLogin = false;
    },
  },

  // XỬ LÝ ACTION GỌI BÊN NGOÀI SLICE
  extraReducers: (builder) => {
    // Peding ...
    builder.addCase(actionTypeAsyncLogin.pending, (state, action) => {
      state.isLoading = true;
      console.log("loading ...");
    });

    // full fill ...
    builder.addCase(actionTypeAsyncLogin.fulfilled, (state, action) => {
      console.log("success ...");
      console.log("check action user in userSlice >>>", action.payload);
      state.isLoading = false;
      state.messExpiToken = "";
      state.dataUser = action?.payload;
    });

    // erorr
    builder.addCase(actionTypeAsyncLogin.rejected, (state, action) => {
      console.log("errorr ...");
      console.log("fail get current user");
      state.isLoading = false;
      state.isLogin = false;
      state.dataUser = "";
      state.messExpiToken = "Phiên đăng nhập của bạn đã hết bạn";
    });
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
