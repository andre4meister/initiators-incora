import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import modal from './modal';
import booking from './booking';
import dashboard from './dashboard';

const store = configureStore({
  reducer: {
    user,
    modal,
    booking,
    dashboard,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
