import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { config, upadeAccessToken } from "../../utils/headerConfig";

export const createUser = createAsyncThunk("user/createUser", async(data, {rejectWithValue})=>{
    try{
        const response = await axios.post("http://localhost:5000/api/user/register", data);
        localStorage.setItem('authentication', response.data.token);
        return response.data.user
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }
})

export const loginUser = createAsyncThunk("user/loginUser", async(data, {rejectWithValue})=>{
    try{
        const response = await axios.post("http://localhost:5000/api/user/login", data);
        localStorage.setItem('authentication', response.data.token);
        return response.data.user
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }
})

export const verifyUser = createAsyncThunk("user/emailVerify", async(data, {rejectWithValue})=>{
    try{
        const response = await axios.put("http://localhost:5000/api/user/emailVerify", data, config());
        upadeAccessToken(response);
        localStorage.setItem('authentication', response.data.token);
        return response.data.user
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }

})

export const verifyPhone = createAsyncThunk("user/verifyPhone", async(data, {rejectWithValue})=>{
    try{
        const response = await axios.put("http://localhost:5000/api/user/phoneVerify", data, config());
        upadeAccessToken(response);
        localStorage.setItem('authentication', response.data.token);
        return response.data.user
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }

})
export const updateUser = createAsyncThunk("user/updateUser", async(data, {rejectWithValue})=>{
    try{
        const response = await axios.put("http://localhost:5000/api/user/updateUser", data, config());
        localStorage.setItem('authentication', response.data.token);
        return response.data.user
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }
})

export const logoutUser = createAsyncThunk("user/logout", async(data, {rejectWithValue})=>{

    try{
        const response = await axios.post("http://localhost:5000/api/user/logout",data, config());
        localStorage.removeItem('authentication');
        return;
    }
    catch(error){
        localStorage.removeItem('authentication');
        console.log(error);
        return rejectWithValue(error.response.data.message);
    }
})

export const deleteUser = createAsyncThunk("user/delete", async(data, {rejectWithValue})=>{

    try{
        const response = await axios.post("http://localhost:5000/api/user/logout", config());
        localStorage.removeItem('authentication');
        return;
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }

})
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser:(state, action)=>{
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; 
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; 
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(verifyUser.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(verifyUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; 
        })
        .addCase(verifyUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; 
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(verifyPhone.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(verifyPhone.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; 
        })
        .addCase(verifyPhone.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null; 
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null; 
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        
    }
})

export const { clearError , setUser} = userSlice.actions;
export default userSlice.reducer;
