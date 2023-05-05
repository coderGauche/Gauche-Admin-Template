/*
 * @Author: Gauche楽
 * @Date: 2023-05-05 22:02:30
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 01:17:29
 * @FilePath: /Gauche-admin-template/src/api/index.ts
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import NProgress from "@/config/nprogress";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { AxiosCanceler } from "./helper/axiosCancel";
import { ResultEnum } from "@/enums/httpEnum";
import { message } from "antd";
import { checkStatus } from "./config/checkStatus";
import { ResultData } from "./interface";
import { store } from "@/redux";
const axiosCanceler = new AxiosCanceler();

const config = {
	baseURL: import.meta.env.VITE_API_URL as string,
	timeout: 1000,
	withCredentials: true
};

class RequestHeep {
	instance: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig): any => {
				NProgress.start();
				axiosCanceler.addPending(config);
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = store.getState().global.token;
				// const token: string = "1111";
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
		this.instance.interceptors.response.use(
			(response: AxiosResponse): any => {
				const { data, config } = response;
				NProgress.done();
				axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				if (data.code == ResultEnum.OVERDUE) {
					// store.dispatch(setToken(""));
					message.error(data.msg);
					window.location.hash = "/login";
					return Promise.reject(data);
				}
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				return data;
			},
			(error: AxiosError) => {
				const { response } = error;
				NProgress.done();
				tryHideFullScreenLoading();
				if (error.message.indexOf("timeout") !== -1) message.error("请求超时，请稍后再试");
				if (response) checkStatus(response.status);
				if (!window.navigator.onLine) window.location.hash = "/500";
				return Promise.reject(error);
			}
		);
	}

	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.instance.delete(url, { params, ..._object });
	}
}

export default new RequestHeep(config);
