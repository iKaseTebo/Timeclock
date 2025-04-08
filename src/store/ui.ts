import { createSlice } from '@reduxjs/toolkit';

type Notification = {
    status: string;
    title: string;
    message: string;
} | null;


const initialState: {notification: Notification} = {
    notification: null,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
              };
        }
    }
})

export const uiActions = uiSlice.actions;