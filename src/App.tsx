/*
 * @Author: Gauche楽
 * @Date: 2023-04-18 17:01:18
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-05 17:10:25
 * @FilePath: /Gauche-admin-template/src/App.tsx
 */
import { HashRouter } from "react-router-dom";
import Router from "@/routers/index";
function App() {
	return (
		<div className="App">
			<HashRouter>
				<Router />
			</HashRouter>
		</div>
	);
}

export default App;
