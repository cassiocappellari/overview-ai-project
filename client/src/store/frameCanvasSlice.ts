import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoundingBox } from "../interfaces";

const initialState: BoundingBox[][] = [];

const frameCanvasSlice = createSlice({
  name: "frameCanvas",
  initialState,
  reducers: {
    setBoundingBox: (state, action: PayloadAction<BoundingBox[]>) => {
      state.push(action.payload)
    },
  },
});

export const { setBoundingBox } = frameCanvasSlice.actions;
export default frameCanvasSlice.reducer;