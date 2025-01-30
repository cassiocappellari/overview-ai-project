import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  iou: number;
  confidence: number;
}

const initialState: ConfigState = {
  iou: 0.5,
  confidence: 0.5,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setIou: (state, action: PayloadAction<number>) => {
      state.iou = action.payload;
    },
    setConfidence: (state, action: PayloadAction<number>) => {
      state.confidence = action.payload;
    },
  },
});

export const { setIou, setConfidence } = configSlice.actions;
export default configSlice.reducer;
