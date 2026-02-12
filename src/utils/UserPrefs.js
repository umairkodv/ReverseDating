import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PREFS = 'USER_PREFS';
const TOKEN = 'TOKEN';
const IS_LOGGED_IN = 'IS_LOGGED_IN';

export const saveUserPrefs = data => {
  try {
    AsyncStorage.setItem(USER_PREFS, data);
  } catch (error) {
    console.log('Error while saving user : ', error);
  }
};

export const getUserPrefs = () => {
  try {
    const value = AsyncStorage.getItem(USER_PREFS);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Error while Get User : ', e);
  }
};

export const removeUserPrefs = () => {
  try {
    const value = AsyncStorage.removeItem(USER_PREFS);
    return value;
  } catch (error) {
    console.log('Error while removing user : ', error);
  }
};

export const saveToken = token => {
  try {
    AsyncStorage.setItem(TOKEN, token);
  } catch (error) {
    console.log('Error while saving token : ', error);
  }
};

export const getToken = () => {
  try {
    const value = AsyncStorage.getItem(TOKEN);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Error while Get token : ', e);
  }
};

export const removeToken = () => {
  try {
    const value = AsyncStorage.removeItem(TOKEN);
    return value;
  } catch (error) {
    console.log('Error while removing token : ', error);
  }
};

export const saveIsLoggedIn = flag => {
  try {
    AsyncStorage.setItem(IS_LOGGED_IN, flag);
  } catch (error) {
    console.log('Error while Is Logged In Save : ', error);
  }
};

export const checkIsLoggedIn = () => {
  try {
    const value = AsyncStorage.getItem(IS_LOGGED_IN);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Error while Check is Logged in : ', e);
  }
};

export const clearAllPreferences = () => {
  AsyncStorage.clear();
};
