/*
 * @Author: Gauche楽
 * @Date: 2023-05-06 00:13:53
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 01:19:10
 * @FilePath: /Gauche-admin-template/src/redux/index.ts
 */
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose, Store } from "redux";
import global from "./modules/global/reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import menu from "./modules/menu/reducer";
import { breadcrumb } from "./modules/breadcrumb/reducer";
import auth from "./modules/auth/reducer";
import tabs from "./modules/tabs/reducer";

const reducer = combineReducers({
	global,
	menu,
	breadcrumb,
	auth,
	tabs
});

export type RootState = ReturnType<typeof reducer>;

const persistConfig = {
	key: "redux-state", // 储存的标识名
	storage: storage
	//  whitelist: ['persistReducer'] //白名单 模块参与缓存
};

const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store//
const persistor = persistStore(store);

export { store, persistor };
