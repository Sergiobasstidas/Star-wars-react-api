import { createSlice } from "@reduxjs/toolkit";

const starWarsState = createSlice({
  name: "starWarsState",
  initialState: {
    selectedData: null,
    residents: [],
  },
  reducers: {
    selectData: (state, action) => {
      state.selectedData = action.payload;
    },
    selectResidents: (state, action) => {
      state.residents = action.payload;
    },
  },
});

export const { selectData, selectResidents } = starWarsState.actions;

export default starWarsState.reducer;
