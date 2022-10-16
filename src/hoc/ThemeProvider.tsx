import {
  FC, createContext, ReactNode, useContext, useState, useMemo,
} from 'react';
import changeTheme from '../utils/changeTheme';

type ThemeTypes = 'light' | 'dark';
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({
  theme: '',
  handleChangeTheme: (newTheme: ThemeTypes) => { },
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeTypes>(JSON.parse(localStorage.getItem('theme') || '') as ThemeTypes || 'light');

  const handleChangeTheme = (newTheme: ThemeTypes) => {
    setTheme(newTheme);
    changeTheme(newTheme);
  };

  const memo = useMemo(() => ({
    theme,
    handleChangeTheme,
  }), [theme]);

  changeTheme(theme);

  return (
    <ThemeContext.Provider value={memo}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;