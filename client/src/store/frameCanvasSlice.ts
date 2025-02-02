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
  created_at: string;
  frame_id: number;
  frame_reference: string;
  id: number;
};

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