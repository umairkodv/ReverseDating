import AxiosBase from '../AxiosBase';

export const getPartnersApi = async id => {
  try {
    const response = await AxiosBase.get(`api/user/getPreviousPartners/${id}`);
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Get Partners Errorrr', error);
    return error;
  }
};

export const getMatchCountApi = async id => {
  try {
    const response = await AxiosBase.get(`comparePartner/${id}`);
    console.log('responsefrommatchCount', response);
    return response;
  } catch (error) {
    console.error('Get matchcount api Errorrr', error);
    return error;
  }
};

export const deletePartnerApi = async (userId, partnerId) => {
  try {
    const response = await AxiosBase.delete(
      `api/user/deletePartner/${userId}/${partnerId}`,
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('delete partner api Errorrr', error);
    return error;
  }
};

export const deleteUserApi = async _id => {
  try {
    const response = await AxiosBase.delete(`api/user/deleteUser/${_id}`);
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('delete user api Errorrr', error);
    return error;
  }
};

export const EditPartnerApi = async (userId, partnerId, data) => {
  try {
    const response = await AxiosBase.put(
      `api/user/update-previous-partner/${userId}/${partnerId}`,
      data,
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('edittt partner api Errorrr', error);
    return error;
  }
};

export const InfidelityReportApi = async (_id, data) => {
  try {
    const response = await AxiosBase.post(
      `api/user/add-infidility/${_id}`,
      data,
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.log('infedility report, FAILLLLL ', error);
    return error.response;
  }
};

export const SupportFormApi = async data => {
  try {
    const response = await AxiosBase.post(`api/auth/submitSupportForm`, data);
    console.log('response', response);
    return response;
  } catch (error) {
    console.log('support form , FAILLLLL ', error);
    return error.response;
  }
};

export const getReportApi = async id => {
  try {
    const response = await AxiosBase.get(
      `api/user/getAllInfidelityDetails/${id}`,
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Get Reports Errorrr', error);
    return error;
  }
};

export const EditInfidelityApi = async (userId, infidilityId, data) => {
  console.log('infeddhadjfjdfvjkgs', infidilityId);
  try {
    const response = await AxiosBase.post(
      `api/user/update-infidility/${userId}/${infidilityId}`,
      data,
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('edittt infidelity api Errorrr', error);
    return error;
  }
};

export const deleteInfidelityApi = async (userId, InfidelityId) => {
  try {
    const response = await AxiosBase.delete(
      `api/user/deleteInfidelity/${userId}/${InfidelityId}`,
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('delete partner api Errorrr', error);
    return error;
  }
};

export const getAllChatsApi = async id => {
  try {
    const response = await AxiosBase.get(`api/chat`);
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Get matchcount api Errorrr', error?.response);
    return error?.response;
  }
};

export const getMatchListApi = async id => {
  try {
    const response = await AxiosBase.get(`api/matches/`);
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Get matchlist api Errorrr', error?.response);
    return error?.response;
  }
};

export const getChatHistory = async data => {
  try {
    const response = await AxiosBase.post(`api/chat`, data);
    console.log('response from getchathisttory', response);
    return response;
  } catch (error) {
    console.error('Get matchcount api Errorrr', error?.response);
    return error?.response;
  }
};

export const sendMessage = async (id, data) => {
  try {
    const response = await AxiosBase.post(`api/chat/${id}/messages`, data);
    console.log('responsefromsendmessage', response);
    return response;
  } catch (error) {
    console.error('send message Errorrr', error?.response);
    return error?.response;
  }
};

export const getCatSearch = async data => {
  try {
    const response = await AxiosBase.post(`api/catfish/check`, data);
    console.log('response from getCatSearch', response);
    return response;
  } catch (error) {
    console.error('Get catsearch Errorrr', error?.response);
    return error?.response;
  }
};

export const getPolling = async taskId => {
  try {
    const response = await AxiosBase.get(`/api/catfish/status/${taskId}`);
    console.log('response from polling', response);
    return response;
  } catch (error) {
    console.error('Get polling error', error?.response);
    return error?.response;
  }
};

export const getInfidelityCount = async () => {
  try {
    const response = await AxiosBase.get(`api/matches/infidelity-matches`);
    console.log('response from infidelity count', response);
    return response;
  } catch (error) {
    console.error('error from infidelity count', error?.response);
    return error?.response;
  }
};
