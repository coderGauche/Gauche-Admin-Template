/*
 * @Author: Gauche楽
 * @Date: 2023-04-18 17:01:18
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 14:43:06
 * @FilePath: /Gauche-admin-template/src/App.tsx
 */
import { HashRouter } from "react-router-dom";
import Router from "@/routers/index";
import AuthRouter from "@/routers/utils/authRouter";
function App() {
	return (
		<HashRouter>
			<AuthRouter>
				<Router />
			</AuthRouter>
		</HashRouter>
	);
}

export default App;
