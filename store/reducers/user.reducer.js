const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import {
  createUserHelper,
  loginUserHelper,
  uploadPhoto,
  createPostHelper,
} from "@/helper/registration/registration.helper";
const userData = {
  _id: "",
  name: "",
  photo: "",
};
const initialState = {
  currentUser: false,
  userData: userData,
  error: false,
  errorText: "",
};

export const createUserAsync = createAsyncThunk(
  "user/registration",
  async (user, thunkAPI) => {
    try {
      console.log(user, "ll");
      const result = await uploadPhoto(user.photo);
      console.log(result.data.secure_url, "reult");
      user["photo"] = result.data.secure_url;
      const response = await createUserHelper(user);
      if (response.status === 201 && result.statusText === "OK") {
        const data = response.data;
        console.log(data, "formmm");
        return data.user;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle the "Email already in use" error
        console.log("Email already in use");
        return thunkAPI.rejectWithValue({ message: "Email already is Use." });
      } else {
        console.error(error);
        return thunkAPI.rejectWithValue({ message: "something went wrong!" });
      }
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await loginUserHelper(data);
      console.log(response.data.data);

      if (response.status === 201) {
        return response.data.data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        return thunkAPI.rejectWithValue({
          message: "Invalid email or password",
        });
      } else {
        return thunkAPI.rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = false;
      state.userData = null;
      (state.errorText = ""), (state.error = false);
    },
    setPostChecker: (state, action) => {
      (state.createPostStatus = false),
        (state.postError = false),
        (state.postErrorMessage = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.currentUser = true;
        state.error = false;
        console.log(action.payload);
        state.userData = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        console.log(action.error);
        state.error = true;
        state.errorText = action.payload.message;
      })
      .addCase(createUserAsync.pending, (state, action) => {
        console.log("creating account...");
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.currentUser = true;
        state.error = false;
        state.userData = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = true;
        state.errorText = action.payload.message;
      });
  },
});
export const { setCurrentUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
