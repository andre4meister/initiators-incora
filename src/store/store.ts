import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import dashboard from './dashboard';
import app from './app';

const store = configureStore({
  reducer: {
    user,
    dashboard,
    app,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
