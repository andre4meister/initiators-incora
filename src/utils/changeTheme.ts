import variables from '../styles/variables.module.scss';

const root = (document.querySelector(':root') as HTMLFormElement);
const currentTheme = '--currentTheme';
const secondTheme = '--secondTheme';
const currentText = '--currentText';
const currentShadowOutline = '--currentBoxShadowOutline';
const currentShadowInset = '--currentBoxShadowInset';
const currentDashboardBoxShadow = '--currentDashboardBoxShadow';
const currentDashboardTheme = '--currentDashboardTheme';

const changeTheme = (newTheme: string) => {
  localStorage.setItem('theme', JSON.stringify(newTheme));
  switch (newTheme) {
    case 'light':
      root.style.setProperty(currentTheme, variables.mainLight);
      root.style.setProperty(secondTheme, variables.secondLight);
      root.style.setProperty(currentText, variables.textLight);
      root.style.setProperty(currentShadowOutline, variables.boxShadowLightOutline);
      root.style.setProperty(currentShadowInset, variables.boxShadowLightInset);
      root.style.setProperty(currentDashboardBoxShadow, variables.boxShadowDashboardLight);
      root.style.setProperty(currentDashboardTheme, variables.colorDashboardLight);
      break;
    case 'dark':
      root.style.setProperty(currentTheme, variables.mainDark);
      root.style.setProperty(secondTheme, variables.secondDark);
      root.style.setProperty(currentText, variables.textDark);
      root.style.setProperty(currentShadowOutline, variables.boxShadowDarkOutline);
      root.style.setProperty(currentShadowInset, variables.boxShadowDarkInset);
      root.style.setProperty(currentDashboardBoxShadow, variables.boxShadowDashboardDark);
      root.style.setProperty(currentDashboardTheme, variables.colorDashboardDark);
      break;
    default: break;
  }
};

export default changeTheme;
