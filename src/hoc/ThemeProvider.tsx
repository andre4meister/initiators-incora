import {
  FC,
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from 'react';
import changeTheme from '../utils/changeTheme';

type ThemeTypes = 'light' | 'dark';
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({
  theme: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleChangeTheme: (newTheme: ThemeTypes) => { },
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeTypes>(
    JSON.parse(
      localStorage.getItem('theme') || JSON.stringify('light'),
    ) as ThemeTypes,
  );

  const handleChangeTheme = (newTheme: ThemeTypes) => {
    setTheme(newTheme);
    changeTheme(newTheme);
  };

  const context = useMemo(
    () => ({
      theme,
      handleChangeTheme,
    }),
    [theme],
  );

  changeTheme(theme);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;
