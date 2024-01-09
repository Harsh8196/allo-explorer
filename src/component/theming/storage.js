"use client"
const themeLocalStorageKey = 'theme';
export function isValidThemePreference(
  theme
) {
  return theme == 'auto' || theme == 'dark' || theme == 'light';
}

export const saveThemePreference = (newTheme) => {
  try {
    if (typeof newTheme === 'string')
      window.localStorage.setItem(themeLocalStorageKey, newTheme);
  } catch (e) {
    console.warn(e);
  }
};

export const getSavedThemePreference = () => {
  try {
    const savedMode = window.localStorage.getItem(themeLocalStorageKey);
    // If the user has explicitly chosen a colour mode,
    // let's use it. Otherwise, this value will be null.
    return isValidThemePreference(savedMode) ? savedMode : 'auto';
  } catch (e) {
    // When Chrome in incognito, localStorage cannot be accessed
    console.warn(e);
    return 'auto';
  }
};