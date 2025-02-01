import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VieoPlayer {
  isVideoPlaying: boolean;
}

const initialState: VieoPlayer = {
  isVideoPlaying: false,
};

const videoPlayerSlice = createSlice({
  name: "videoPlayer",
  initialState,
  reducers: {
    setIsVideoPlaying: (state, action: PayloadAction<boolean>) => {
      state.isVideoPlaying = action.payload;
    },
  },
});

export const { setIsVideoPlaying } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
