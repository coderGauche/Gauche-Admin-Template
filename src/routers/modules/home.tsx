/*
 * @Author: Gauche楽
 * @Date: 2023-03-31 00:00:16
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-05 17:10:27
 * @FilePath: /Gauche-admin-template/src/routers/modules/home.tsx
 */
import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import Home from "@/views/home/index";

// 首页模块
const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				element: <Home />,
				meta: {
					// keepAlive: true,
					requiresAuth: true,
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default homeRouter;
