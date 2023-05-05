/*
 * @Author: Gauche楽
 * @Date: 2023-05-05 00:10:57
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 01:05:48
 * @FilePath: /Gauche-admin-template/src/views/login/components/LoginFrom.tsx
 */
import React, { useState } from "react";
import type { ReactNode } from "react";
import { Button, Form, FormInstance, Input, message } from "antd";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import md5 from "js-md5";
import { loginApi } from "@/api/modules/login";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";

interface IProps {
	children?: ReactNode;
}
const LoginForm: React.FC<IProps> = (props: any) => {
	const { setToken } = props;
	const navigate = useNavigate();
	const formRef = React.useRef<FormInstance>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			loginForm.password = md5(loginForm.password);
			const { data } = await loginApi(loginForm);
			setToken(data?.access_token);
			// setTabsList([]);
			message.success("登录成功！");
			navigate("/home/index");
		} finally {
			setLoading(false);
		}
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const onReset = () => {
		formRef.current?.resetFields();
	};
	return (
		<Form
			ref={formRef}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button icon={<CloseCircleOutlined />} htmlType="button" onClick={onReset}>
					{/* {t("login.reset")} */} 重置
				</Button>
				<Button loading={loading} type="primary" icon={<UserOutlined />} htmlType="submit">
					{/* {t("login.confirm")} */} 登录
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(LoginForm);
