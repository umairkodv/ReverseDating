import {saveToken, saveUserPrefs} from '../../utils/UserPrefs';
import {VARIABLES} from '../../utils/globalVariables';
import AxiosBase from '../AxiosBase';

export const SignupApi = async data => {
  try {
    const response = await AxiosBase.post('api/auth/register', data);
    console.log('response', response);
    const mainToken = response?.token;
    console.log('token savedd', mainToken);
    saveToken(mainToken);
    saveUserPrefs(JSON.stringify(response?.user));
    VARIABLES.details = JSON.stringify(response?.user);
    console.log('detailsSaved', VARIABLES.details);
    return response;
  } catch (error) {
    console.log('Sign up error, FAILLLLL ', error?.response);
    return error?.response;
  }
};

export const LoginApi = async data => {
  try {
    const response = await AxiosBase.post('api/auth/login', data);
    console.log('response', response);
    const mainToken = response?.token;
    console.log('token savedd', mainToken);
    saveToken(mainToken);
    saveUserPrefs(JSON.stringify(response?.user));
    VARIABLES.details = JSON.stringify(response?.user);
    console.log('detailsSaved', VARIABLES.details);
    return response;
  } catch (error) {
    console.log('Sign up error, FAILLLLL ', error?.response);
    return error?.response;
  }
};

export const SocialLoginApi = async data => {
  try {
    const response = await AxiosBase.post(
      'api/auth/firebase-authentication',
      data,
    );
    const mainToken = response?.jwtToken;
    console.log('maintoken from social', mainToken);
    saveToken(mainToken);
    saveUserPrefs(JSON.stringify(response?.user));
    VARIABLES.details = JSON.stringify(response?.user);
    console.log('details', VARIABLES.details);
    return response;
  } catch (error) {
    console.log('socialLogin, FAILLLLL ', error);
    return error.response;
  }
};

export const PartnerDetailsApi = async (_id, data) => {
  try {
    const response = await AxiosBase.post(`api/user/add-partner/${_id}`, data);
    console.log('response', response);
    return response;
  } catch (error) {
    console.log('partnerdetails, FAILLLLL ', error);
    return error.response;
  }
};

export const forgotPassApi = async data => {
  try {
    const response = await AxiosBase.post('api/auth/forgot-password', data);
    return response;
  } catch (error) {
    console.log('forgott ERROR, FAILLLLL ', error);
    return error.response;
  }
};

export const VerifyOtpApi = async data => {
  try {
    const response = await AxiosBase.post('api/auth/verify-otp', data);
    return response;
  } catch (error) {
    console.log('verify otp ERROR, FAILLLLL ', error);
    return error.response;
  }
};

export const NewPassApi = async data => {
  try {
    const response = await AxiosBase.post('api/auth/save-password', data);
    return response;
  } catch (error) {
    console.log('new pass error, FAILLLLL ', error);
    return error.response;
  }
};
