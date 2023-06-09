/*
 * @Author: Gauche楽
 * @Date: 2023-04-18 17:01:18
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 00:20:47
 * @FilePath: /Gauche-admin-template/vite.config.ts
 */
import { ConfigEnv, UserConfig, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import { wrapperEnv } from "./src/utils/getEnv";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import eslintPlugin from "vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
const baseUrl = "react-admin-vite-antd5";

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
	const env = loadEnv(config.mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		plugins: [
			react(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * 是否生成包预览
			viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				})
		],
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		server: {
			host: "0.0.0.0", // * 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			open: viteEnv.VITE_OPEN,
			port: viteEnv.VITE_PORT,
			cors: true,
			https: false,
			proxy: {
				"/api": {
					// target: "http://codercba.com:9002",
					target: "https://mock.mengxuegu.com/mock/62abda3212c1416424630a45",
					// *是 Vite 开发服务器的一个选项，它用于修改目标 URL 的来源。它允许浏览器向不同于提供 Vite 打包的域发送请求，
					// *这对于代理到不同域上托管的后端 API 很有用。特别是在开发时，可以使用 "changeOrigin" 将请求代理到本地运行的后端服务，
					// *以便进行开发和调试。
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
		css: {
			preprocessorOptions: {
				less: {
					// modifyVars: {
					// 	"primary-color": "#1DA57A",
					// },
					javascriptEnabled: true,
					additionalData: `@import "@/styles/var.less";`
				}
			}
		},
		base: config.mode === "development" ? "/" : `/${baseUrl}/`,
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		build: {
			// outDir: baseUrl,
			outDir: "dist",
			minify: "esbuild",
			rollupOptions: {
				output: {
					chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
					entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
					assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
					manualChunks(id: any) {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
						}
					}
				}
			}
		}
	};
});
