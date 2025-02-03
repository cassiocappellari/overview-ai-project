import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoPlayer {
  isVideoPlaying: boolean;
  isVideoLoading: boolean;
}

const initialState: VideoPlayer = {
  isVideoPlaying: false,
  isVideoLoading: false,
};

const videoPlayerSlice = createSlice({
  name: "videoPlayer",
  initialState,
  reducers: {
    setIsVideoPlaying: (state, action: PayloadAction<boolean>) => {
      state.isVideoPlaying = action.payload;
    },
    setIsVideoLoading: (state, action: PayloadAction<boolean>) => {
      state.isVideoLoading = action.payload;
    },
  },
});

export const { setIsVideoPlaying, setIsVideoLoading } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;