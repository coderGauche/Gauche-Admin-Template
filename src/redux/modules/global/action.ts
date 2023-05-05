/*
 * @Author: Gauche楽
 * @Date: 2023-05-06 00:48:52
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 00:57:49
 * @FilePath: /Gauche-admin-template/src/redux/modules/global/action.ts
 */

import * as types from "@/redux/mutation-types";

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
});
