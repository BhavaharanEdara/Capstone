import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from "../features/users/userSlice";
import { kycSlice } from "../features/kyc/kycSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    kyc:kycSlice.reducer,
  },
});