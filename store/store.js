import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import thunkMiddleware from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "./reducers/post.reducer";
const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistReducers = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistReducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),
});
export const persistStoreS = persistStore(store);
