/*
 * @Author: Gauche楽
 * @Date: 2023-04-18 17:01:18
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-04 21:19:29
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

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
