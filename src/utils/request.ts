import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestConfig } from './request.type';
import { notification } from 'antd';

export const ERROR_TEXT = {
  noNetWork: '呀，网没了，检查下网络吧',
  serverError: '服务器失联了',
  timeout: '连接超时了，再试试',
};

export function throwError(toastError: boolean, message: string) {
  if (toastError) {
    notification.error({ message, duration: 3 });
  }
  return new Error(message);
}

export default function (url: string, ops: RequestConfig) {
  const { method = 'get', params, data, toastError = true, ...otherConfig } = ops;

  let requestUrl = url;
  const { protocol } = window.location;

  if (url.startsWith('//')) {
    requestUrl = `${protocol}${url}`;
  } else if (url.startsWith('/')) {
    requestUrl = `${protocol}//${window.location.host}${url}`;
  }

  const requestConfig: AxiosRequestConfig = {
    url: requestUrl,
    method,
    timeout: 10000, // 10s超时
    responseType: 'json',
    ...otherConfig,
  };

  if (method && ['post', 'put'].includes(method.toLowerCase())) {
    requestConfig.data = data;
    requestConfig.params = params;
  } else {
    requestConfig.params = { ...data, ...params };
  }
  requestConfig.timeoutErrorMessage = ERROR_TEXT.timeout;

  const responseSuccess = function (response: AxiosResponse) {
    const { status } = response;
    if (status === 200) {
      return response.data;
    }
    if (status === 0) {
      throw throwError(toastError, `${ERROR_TEXT.noNetWork}`);
    }

    throw throwError(toastError, `${ERROR_TEXT.serverError}(${status})`);
  };

  const responseError = function (error: AxiosError) {
    throw throwError(toastError, error.message);
  };

  axios.interceptors.response.use(responseSuccess, responseError);

  return axios(requestConfig);
}
