import axios, { AxiosError } from 'axios';
import { put } from 'redux-saga/effects';
import { addNotification } from 'store/alert';

export default function* errorSagaHandler(err: unknown) {
  const result = err as AxiosError<{ statusCode: number; message: string }>;
  if (axios.isAxiosError(err)) {
    if (result.response) {
      yield put(
        addNotification({
          message: result.response.data.message,
          type: 'error',
        }),
      );
    }
  } else {
    yield put(addNotification({ message: 'Error has occured', type: 'error' }));
  }
  return result;
}
