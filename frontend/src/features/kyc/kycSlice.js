import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config,  upadeAccessToken } from "../../utils/headerConfig";


export const fetchKyc = createAsyncThunk("kyc/getApplication", async(data, {rejectWithValue})=>{
    try{
        const response = await axios.get("http://localhost:5000/api/kyc/apply", config());
        upadeAccessToken(response);
        return response.data.application
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }

})

export const applyKyc = createAsyncThunk("kyc/apply", async(data, {rejectWithValue})=>{
    const getTokenFromLocalStorage = localStorage.getItem("authentication")
  ? localStorage.getItem("authentication")
  : null;

    try{
        const response = await axios.post(`http://localhost:5000/api/kyc/apply`, data, 
            {
                headers: {
                    authorization: `Bearer ${
                      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
                    }`,
                    'Content-Type': "multipart/form-data",
                  },
            }
        );
        upadeAccessToken(response);
        return response.data.application
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }    
})

export const updateKyc = createAsyncThunk("kyc/update", async(data, {rejectWithValue})=>{
    const getTokenFromLocalStorage = localStorage.getItem("authentication")
  ? localStorage.getItem("authentication")
  : null;

    try{
        const response = await axios.put(`http://localhost:5000/api/kyc/update`, data, 
            {
                headers: {
                    authorization: `Bearer ${
                      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
                    }`,
                    'Content-Type': "multipart/form-data",
                  },
            }
        );
        upadeAccessToken(response);
        console.log(response)
        return response.data.updatedApplication
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }    
})

export const deleteKyc = createAsyncThunk("kyc/delete", async({rejectWithValue})=>{
    try{
        const response = await axios.delete("http://localhost:5000/api/kyc/delete", config());
        return;
    }
    catch(error){
        console.log(error,error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

export const kycSlice = createSlice({
    name:"kyc",
    initialState:{
        application:null,
        loading:false,
        error:null
    },
    reducers:{
        removeKyc:(state,action)=>{
            console.log("kyc")
            state.application = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchKyc.fulfilled, (state,action)=>{
            state.loading = false;
            state.application = action.payload
        }).addCase(fetchKyc.pending, (state,action)=>{
            state.loading = true;
        }).addCase(fetchKyc.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(applyKyc.fulfilled, (state,action)=>{
            state.loading = false;
            state.application = action.payload
        }).addCase(applyKyc.pending, (state,action)=>{
            state.loading = true;
        }).addCase(applyKyc.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(updateKyc.fulfilled, (state,action)=>{
            state.loading = false;
            state.application = action.payload
        }).addCase(updateKyc.pending, (state,action)=>{
            state.loading = true;
        }).addCase(updateKyc.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(deleteKyc.fulfilled, (state,action)=>{
            state.loading = false;
            state.application = null;
        }).addCase(deleteKyc.pending, (state,action)=>{
            state.loading = true;
        }).addCase(deleteKyc.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }

})
export const { removeKyc} = kycSlice.actions;

export default kycSlice.reducer;
