import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const frameIdSlice = createSlice({
  name: "frameId",
  initialState: 0,
  reducers: {
    setFrameId: (_state, action: PayloadAction<number>) => action.payload,
  },
});

export const { setFrameId } = frameIdSlice.actions;
export default frameIdSlice.reducer;