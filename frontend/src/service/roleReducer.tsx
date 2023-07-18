import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "roles",
  initialState: {
    data: [],
  },
  reducers: {
    setRoleData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRoleData } = roleSlice.actions;

export default roleSlice.reducer;
