import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actionTypeAsyncLogin from "./actionTypeAsyncLogin";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: '',
    isLogin: false,
    isLoading: false,
    dataUser: ''
  },
  reducers: {
    login: (state, action) => {
        console.log('action >>>', action)
        state.token = action?.payload?.accessToken
        state.isLogin = true
    }, 
    logout: (state, action) => {
      state.token = null
      state.isLogin = false
    }
  },

  // XỬ LÝ ACTION GỌI BÊN NGOÀI SLICE
  extraReducers: (builder) => {
    // Peding ...
    builder.addCase(actionTypeAsyncLogin.pending, (state, action) => {
      state.isLoading = true
    });

    // full fill ...
    builder.addCase(actionTypeAsyncLogin.fulfilled, (state, action) => {
      console.log('check action user in userSlice >>>', action.payload)
      state.isLoading = false
      state.dataUser = action?.payload
    });

    // erorr
    builder.addCase(actionTypeAsyncLogin.rejected, (state, action) => {
      state.isLoading = false
      
    });
  },
});

// Action creators are generated for each case reducer function
export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
