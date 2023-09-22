import { uploadPhoto,createPostHelper } from "@/helper/registration/registration.helper";
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
const initialState = {
    createPostStatus: false,
    postError: false,
    postErrorMessage: "",
}
export const createPostAsync = createAsyncThunk(
    "post/createPost",
    async (data, thunkAPI) => {
      try {
        const result = await uploadPhoto(data.photo);
        console.log(result.data.secure_url, "reult");
        data["photo"] = result.data.secure_url;
        const response = await createPostHelper(data);
        if (response.status === 201) {
          return true;
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return thunkAPI.rejectWithValue({
            message: "Something went wrong",
          });
        }
      }
    }
  );
  export const deletePostAsync = createAsyncThunk('post',async (data,thunkAPI)=>{
    try{

    }catch(err){
        
    }
  })
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostChecker: (state, action) => {
              state.createPostStatus = false,
              state.postError = false,
              state.postErrorMessage = "";
          }
    },
    extraReducers: (builder)=>{
        builder.addCase(createPostAsync.fulfilled, (state, action) => {
            state.createPostStatus = true;
            state.postError = false;
            state.postErrorMessage = "";
          })
          .addCase(createPostAsync.rejected, (state, action) => {
            console.log(action.error);
            state.postError = true;
            state.postErrorMessage = action.payload.message;
          })
          .addCase(createPostAsync.pending, (state, action) => {
            console.log("making a post...");
          })
    }


})
export const { setPostChecker } = postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer;