import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import user from './user';
import modal from './modal';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user,
    modal,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
