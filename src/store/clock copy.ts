// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type ClockEntry = {
//     date: string;       // e.g., "2025-03-27"
//     clockIn: string;    // Timestamp or formatted string, e.g., "09:00 AM"
//     clockOut: string;
//     note: string;   // Timestamp or formatted string, e.g., "05:00 PM"
//     duration: number;   // Duration in minutes, e.g., 480 for 8 hours
// };

// type WeeklyRecord = {
//     date: string;              // e.g., "2025-03-27"
//     entries: ClockEntry[];     // Multiple clock-in/clock-out pairs for a single day
//     totalDuration: number;     // Total minutes for the day
// };

// type ClockState = {
//   isClockedIn: boolean;
//   currentClockIn: string | null;   // Timestamp of the current clock-in
//   weeklyRecords: WeeklyRecord[];   // Array of records for each day of the week
//   totalTime: number;               // Total time for the week in minutes
//   error: string | null;            // Error message if something goes wrong
// };


// const initialState: ClockState = {
//     isClockedIn: false,
//     currentClockIn: null,
//     weeklyRecords: [],
//     totalTime: 0,
//     error: null,
// };

// export const clockSlice = createSlice({
//     name: 'clock',
//     initialState,
//     reducers: { 
//         clockIn: (state, action: PayloadAction<{ time: string; date: string }>) => {
//             state.isClockedIn = true;
//             state.currentClockIn = action.payload.time;
//             state.error = null;
//           },
//           clockOut: (state, action: PayloadAction<{ time: string }>) => {
//             if (!state.isClockedIn || !state.currentClockIn) {
//               state.error = 'Cannot clock out without clocking in.';
//               return;
//             }
      
//             const currentTime = new Date(action.payload.time).getTime();
//             const clockInTime = new Date(state.currentClockIn).getTime();
//             const duration = Math.floor((currentTime - clockInTime) / (1000 * 60)); // Duration in minutes
      
//             const date = new Date().toISOString().split('T')[0];
//             const recordIndex = state.weeklyRecords.findIndex(record => record.date === date);
      
//             if (recordIndex === -1) {
//               state.weeklyRecords.push({
//                 date,
//                 entries: [{ date: date, clockIn: state.currentClockIn, clockOut: action.payload.time, note: action.payload.note, duration }],
//                 totalDuration: duration,
//               });
//             } else {
//               const existingRecord = state.weeklyRecords[recordIndex];
//               existingRecord.entries.push({ date: date, clockIn: state.currentClockIn, clockOut: action.payload.time, note: action.payload.note, duration });
//               existingRecord.totalDuration += duration;
//             }
      
//             state.isClockedIn = false;
//             state.currentClockIn = null;
//             state.totalTime += duration;
//             state.error = null;
//           },
//           resetWeeklyRecords: (state) => {
//             state.weeklyRecords = [];
//             state.totalTime = 0;
//             state.error = null;
//           },
//           setError: (state, action: PayloadAction<{ message: string }>) => {
//             state.error = action.payload.message;
//           },
//     },
// })

// export const clockActions = clockSlice.actions;