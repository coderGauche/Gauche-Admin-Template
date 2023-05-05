/*
 * @Author: Gauche楽
 * @Date: 2023-04-18 17:01:18
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 01:02:34
 * @FilePath: /Gauche-admin-template/src/main.tsx
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "@/styles/common.less";
import "@/styles/reset.less";
import "virtual:svg-icons-register";
import "@/assets/iconfont/iconfont.less";
import "@/assets/fonts/font.less";
import "./tailwind.css";
import "antd/dist/reset.css";
import "@/styles/theme/theme-default.less";

import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);
