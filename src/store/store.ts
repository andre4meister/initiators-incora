import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import dashboard from './dashboard';
import modal from './modal';

const store = configureStore({
  reducer: {
    user,
    dashboard,
    modal,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
