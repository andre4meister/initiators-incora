/* eslint-disable no-self-compare */
import { fireEvent, render } from '@testing-library/react';
import CheckBox from 'components/UI/CheckBox/CheckBox';

describe('Checkbox component', () => {
  it('Should return is checkbox checked', () => {
    const checked = false;
    const { getByTestId } = render(
      <CheckBox
        isChecked={checked}
        handleOnChange={() => console.log('CheckBox changed')}
        data-testid="checkbox_testId"
      />,
    );

    const checkbox = getByTestId('checkbox_testId') as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
  });
  it('Should change on handleOnChange', () => {
    const checked = false;
    const { getByTestId } = render(
      <CheckBox
        isChecked={checked}
        handleOnChange={() => checked !== checked}
        data-testid="checkbox_testId"
      />,
    );
    const checkbox = getByTestId('checkbox_testId') as HTMLInputElement;
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toBe(true);
  });
});
