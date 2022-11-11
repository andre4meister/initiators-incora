/* eslint-disable implicit-arrow-linebreak */
import { FC } from 'react';
import AsyncSelect from 'react-select/async';
import { User } from 'types/dataTypes';
import userOptionHelper from 'utils/userOptionHelper';

interface SelectProps {
  users: User[];
}
export interface UserOption {
  value: number;
  label: string;
}

const Select: FC<SelectProps> = ({ users }) => {
  const userOptions: UserOption[] = userOptionHelper(users);

  const filterUsers = (inputValue: string) =>
    userOptions.filter((u) =>
      u.label.toLowerCase().includes(inputValue.toLowerCase()));

  const promiseOptions = (inputValue: string) =>
    new Promise<UserOption[]>((resolve) => {
      setTimeout(() => {
        resolve(filterUsers(inputValue));
      }, 1000);
    });
  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
    />
  );
};

export default Select;
