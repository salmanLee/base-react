import { Method, AxiosRequestConfig } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  /**
   * 请求queryString参数
   */
  params?: Record<string, any>;
  /**
   * 请求参数，GET/DELETE为querystring，POST/PUT为requestBody
   */
  data?: Record<string, any>;
  /**
   * 请求方法
   */
  method?: Method;
  /**
   * 请求头
   */
  headers?: Record<string, any>;
  /**
   * 是否自动toast错误
   */
  toastError?: boolean;
  /**
   * 不处理接口错误
   */
  noHandleError?: boolean;
}
