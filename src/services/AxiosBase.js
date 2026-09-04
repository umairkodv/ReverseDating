import axios from 'axios';
import {clearAllPreferences, getToken, removeToken} from '../utils/UserPrefs';
import {navigationStrings} from '../utils/constants';
import {navigationRef} from '../navigators/RouteNavigation';
let isNavigatingToLogin = false;

const AxiosBase = axios.create({
  // baseURL: 'http://18.232.182.105:7001/',
  baseURL: 'https://reverse-dating-3ioe.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});


//
AxiosBase.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = `Bearer ${await getToken()}`;
    // console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 68b036fa78407089d2fa75e9
AxiosBase.interceptors.response.use(
  response => {
    return response?.data;
  },
  async error => {
    const {response} = error;
    console.log('axios401error', response);
    if (response && response?.status === 401) {
      if (!isNavigatingToLogin) {
        isNavigatingToLogin = true;
        console.log('flagofnavigation', isNavigatingToLogin);
        console.log('Authentication error detected. Logging out...');
        removeToken();
        clearAllPreferences();
        console.log('Authentication error detected. Logging out...22222');
        setTimeout(async () => {
          navigationRef.current?.reset({
            index: 0,
            routes: [
              {
                name: navigationStrings?.AuthStackNavigatorAuthenticate,
              },
            ],
          });
          isNavigatingToLogin = false;
        }, 700);
      }

      console.log('Authentication error detected. Logging out...4234');
    }
    return Promise.reject(error);
  },
);

export default AxiosBase;
