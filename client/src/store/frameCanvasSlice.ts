import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Box {
  height: number;
  left: number;
  top: number;
  width: number;
};

export interface BoundingBox {
  box: Box;
  class_name: string;
  confidence: number
};

const frameCanvasSlice = createSlice({
  name: "frameCanvas",
  initialState: [] as BoundingBox[][],
  reducers: {
    setBoundingBox: (state, action: PayloadAction<BoundingBox[]>) => {
      state.splice(0, 1, action.payload)
    },
  },
});

export const { setBoundingBox } = frameCanvasSlice.actions;
export default frameCanvasSlice.reducer;