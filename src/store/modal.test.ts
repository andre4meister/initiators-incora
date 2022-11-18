import { AnyAction } from 'redux';
import reducer, { initialState } from './modal';

describe('testing modal reducer', () => {
  it('should return initial state of modal reducer', () => {
    expect(reducer(initialState, {} as AnyAction)).toBe(initialState);
  });

  it('should work action toggleModal', () => {
    expect(
      reducer(initialState, { type: 'modal/toggleModal', payload: true }),
    ).toStrictEqual({ ...initialState, modalIsOpen: true });
  });

  it('should work action toggleLockModal', () => {
    expect(
      reducer(initialState, { type: 'modal/toggleLockModal', payload: true }),
    ).toStrictEqual({ ...initialState, modalIsLocked: true });
  });

  it('should work action toggleModalType', () => {
    expect(
      reducer(initialState, {
        type: 'modal/toggleModalType',
        payload: 'BookingFromCalendar',
      }),
    ).toStrictEqual({ ...initialState, modalType: 'BookingFromCalendar' });
  });
});
