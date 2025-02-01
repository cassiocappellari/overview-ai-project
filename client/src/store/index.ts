import { configureStore } from "@reduxjs/toolkit";
import configPanelReducer from "./configPanelSlice";
import frameCanvasSlice from "./frameCanvasSlice";
import videoPlayerSlice from "./videoPlayerSlice";

export const store = configureStore({
  reducer: {
    configPanel: configPanelReducer,
    frameCanvas: frameCanvasSlice,
    videoPlayer: videoPlayerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
