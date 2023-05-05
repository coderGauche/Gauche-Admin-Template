/*
 * @Author: Gauche楽
 * @Date: 2023-04-05 23:57:32
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 01:15:37
 * @FilePath: /Gauche-admin-template/src/redux/modules/auth/reducer.ts
 */

import { AuthState } from "@/redux/interface";
import { produce } from "immer";
import { AnyAction } from "redux";
import * as types from "@/redux/mutation-types";

const authState: AuthState = {
	authButtons: {},
	authRouter: []
};

const auth = (state: AuthState = authState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_AUTH_BUTTONS:
				draftState.authButtons = action.authButtons;
				break;
			case types.SET_AUTH_ROUTER:
				draftState.authRouter = action.authRouter;
				break;
			default:
				return draftState;
		}
	});

export default auth;
