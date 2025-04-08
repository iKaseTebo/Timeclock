import { configureStore } from '@reduxjs/toolkit';
import { clockSlice } from './clock';
import { uiSlice } from './ui';

const store = configureStore({
    reducer: { clock: clockSlice.reducer, ui: uiSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;