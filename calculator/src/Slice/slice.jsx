import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  calculation: "",
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    appendValue: (state, action) => {
      state.input += action.payload;
      state.calculation += action.payload;
    },
    clearLast: (state) => {
      state.input = state.input.slice(0, -1);
      state.calculation = state.calculation.slice(0, -1);
    },
    clearAll: (state) => {
      state.input = "";
      state.calculation = "";
    },
    evaluateExpression: (state) => {
      state.input = eval(state.calculation);
      state.calculation = state.input;
    },
  },
});

export const { appendValue, clearLast, clearAll, evaluateExpression } =
  calculatorSlice.actions;
export default calculatorSlice.reducer;
