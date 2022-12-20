import { StylesConfig } from 'react-select';
import { RoomType } from 'types/CommonTypes';
import { User } from 'types/dataTypes';

export const selectRoomStyles: StylesConfig<RoomType> = {
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    color: isSelected ? '#ba2d0b' : '#var(--currentText)',
    fontWeight: '700',
    backgroundColor: isFocused ? 'grey' : 'transparent',
  }),
  control: (provided) => ({
    ...provided,
    fontWeight: '700',
    borderRadius: '10px',
    boxShadow: 'var(--currentBoxShadowInset)',
    backgroundColor: 'var(--currentTheme)',
    border: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--currentText)',
  }),
  container: (provided) => ({
    ...provided,
    minWidth: '100%',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    backgroundColor: '#ffffff',
  }),
  menuList: (provided) => ({
    ...provided,
    minWidth: '100%',
    padding: '0px',
    borderRadius: '10px',
    position: 'absolute',
    backgroundColor: 'var(--secondTheme)',
  }),
};

export const selectUserStyles: StylesConfig<User> = {
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    color: isSelected ? '#ba2d0b' : '#var(--currentText)',
    fontWeight: '700',
    backgroundColor: isFocused ? 'grey' : 'transparent',
  }),
  control: (provided) => ({
    ...provided,
    width: '300px',
    height: 'fit-content',
    maxHeight: '300px',
    position: 'relative',
    fontWeight: '700',
    borderRadius: '10px',
    boxShadow: 'var(--currentBoxShadowInset)',
    backgroundColor: 'var(--currentTheme)',
    border: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--currentText)',
  }),
  container: (provided) => ({
    ...provided,
    minWidth: '100%',
    position: 'relative',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    backgroundColor: '#ffffff',
  }),
  menuList: (provided) => ({
    ...provided,
    minWidth: '100%',
    padding: '0px',
    borderRadius: '10px',
    position: 'absolute',
    backgroundColor: 'var(--secondTheme)',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    svg: {
      fill: '#18191a',
    },
  }),
};

export const selecDaysOfWeekStyles: StylesConfig<{ label: string; value: number }> = {
  input: (provided) => ({
    ...provided,
    color: '#var(--currentText)',
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    color: isSelected ? '#ba2d0b' : '#var(--currentText)',
    fontWeight: '700',
    backgroundColor: isFocused ? 'grey' : 'transparent',
  }),
  control: (provided) => ({
    ...provided,
    width: '300px',
    height: 'max-content',
    maxHeight: '300px',
    position: 'relative',
    fontWeight: '700',
    borderRadius: '10px',
    boxShadow: 'var(--currentBoxShadowInset)',
    backgroundColor: 'var(--currentTheme)',
    border: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--currentText)',
  }),
  container: (provided) => ({
    ...provided,
    minWidth: '100%',
    position: 'relative',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    backgroundColor: '#ffffff',
  }),
  menuList: (provided) => ({
    ...provided,
    minWidth: '100%',
    padding: '0px',
    borderRadius: '10px',
    position: 'absolute',
    backgroundColor: 'var(--secondTheme)',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    svg: {
      fill: '#18191a',
    },
  }),
};
