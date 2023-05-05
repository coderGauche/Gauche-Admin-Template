/*
 * @Author: Gauche楽
 * @Date: 2023-05-04 23:50:34
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-05 17:10:23
 * @FilePath: /Gauche-admin-template/src/routers/index.tsx
 */
import { RouteObject } from "./interface";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/views/login/index";
import NotFound from "@/components/ErrorMessage/404";

// * 导入所有router
const metaRouters = import.meta.glob("./modules/*.tsx", { eager: true }) as Record<string, any>;

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray,
	{
		path: "*",
		element: <NotFound />
	}
];

const Router = () => {
	//@ts-ignore
	const routers = useRoutes(rootRouter);
	return routers;
};

export default Router;
