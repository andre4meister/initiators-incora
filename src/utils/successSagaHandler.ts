import { put } from 'redux-saga/effects';
import { addNotification } from 'store/alert';

export default function* successSagaHadler(message: string, status: number) {
  if (status === 200 || status === 201) {
    yield put(addNotification({ message, type: 'success' }));
  }
}
