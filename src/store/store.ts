import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import user from './user';
import modal from './modal';
import booking from './booking';
import dashboard from './dashboard';
import alert from './alert';
import selectedBooking from './selectedBooking';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user,
    modal,
    booking,
    dashboard,
    alert,
    selectedBooking,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
