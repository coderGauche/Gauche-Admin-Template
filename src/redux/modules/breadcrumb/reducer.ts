/*
 * @Author: Gauche楽
 * @Date: 2023-05-06 01:12:32
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 01:15:43
 * @FilePath: /Gauche-admin-template/src/redux/modules/breadcrumb/reducer.ts
 */
import { BreadcrumbState } from "@/redux/interface";
import { produce } from "immer";
import { AnyAction } from "redux";
import * as types from "@/redux/mutation-types";

const breadcrumbState: BreadcrumbState = {
	breadcrumbList: {}
};

export const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_BREADCRUMB_LIST:
				draftState.breadcrumbList = action.breadcrumbList;
				break;
			default:
				return draftState;
		}
	});
