import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import modal from './modal';

const store = configureStore({
  reducer: {
    user,
    modal,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
