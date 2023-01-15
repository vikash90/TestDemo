import EventBus from 'react-native-event-bus'
import axios from 'axios';
import Config from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GA_EVENT_TIMING = 'timing';
async function waitForResponse() {

  axios.defaults.headers['x-token-authorization'];
}
waitForResponse();

function listener() {
  return getState()?.reorderReducer?.baseUrl;
  // return null;
}

function getAxiosInstance(axiosConfig) {
  let finalURL = listener();

  console.log('Final Url', finalURL);

  return axios.create({
    baseURL: finalURL ? finalURL : Config.api.baseURL,
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...axiosConfig,
  });
}

export const getInstrumentedAxiosInstance = (apiFor, axiosConfig) => {
  const state = store?.getState();

  const instance = getAxiosInstance({
    ...axiosConfig,
  });
  let startTime;
  let duration;

  instance.interceptors.request.use(
    async interceptorConfig => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        interceptorConfig.headers['x-token-authorization'] = token;
      }

      startTime = new Date().getTime();
      return interceptorConfig;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => {
      duration = new Date().getTime() - startTime;
      if (response.data.data && response.data.data._token) {
        localStorage.setItem('token', response.data.data._token);
      }
      return response;
    },
    async error => {
      console.log('in interceptor reponse ', error);
      if (error && error.response && error.response.status === 401) {
        EventBus.getInstance().fireEvent('token401');
      }
      if (error && error.response && error.response.status === 406) {
        EventBus.getInstance().fireEvent('token406');
        await AsyncStorage.setItem(
          'ErrorMessage406',
          error?.response.data.errors.message || 'Vikash',
        );
      }
      duration = new Date().getTime() - startTime;
      return Promise.reject(error);
    },
  );

  return instance;
};
