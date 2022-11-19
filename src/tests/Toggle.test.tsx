/* eslint-disable no-self-compare */
import { fireEvent, render } from '@testing-library/react';
import Toggle from 'components/UI/Toggle/Toggle';

describe('Toggle component', () => {
  it('Should change on handleOnChange', () => {
    const checked = true;
    const { getByTestId } = render(
      <Toggle
        isToggle={checked}
        handleOnChange={() => checked !== checked}
        data-testid="toggle_testId"
      />,
    );
    const checkbox = getByTestId('toggle_testId') as HTMLInputElement;
    fireEvent.change(checkbox, { target: { checked: false } });
    expect(checkbox.checked).toBe(false);
  });
});
