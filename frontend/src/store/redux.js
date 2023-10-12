import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import userSlice from "./userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'USER_LOGIN',
  storage,
}
const userPersistConfig = {
  ...persistConfig,
  whitelist: ['token', 'isLogin']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userPersistConfig, userSlice)
  },
});

export const persistor = persistStore(store)