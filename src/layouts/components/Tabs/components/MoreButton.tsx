/*
 * @Author: Gauche楽
 * @Date: 2023-04-12 23:36:38
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-06 14:59:02
 * @FilePath: /Gauche-admin-template/src/layouts/components/Tabs/components/MoreButton.tsx
 */
import { HOME_URL } from "@/config/config";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const MoreButton = (props: any) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	// close multipleTab
	const closeMultipleTab = (tabPath?: string) => {
		const handleTabsList = props.tabsList.filter((item: Menu.MenuOptions) => {
			return item.path === tabPath || item.path === HOME_URL;
		});
		props.setTabsList(handleTabsList);
		tabPath ?? navigate(HOME_URL);
	};
	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <span>关闭当前</span>,
			onClick: () => props.delTabs(pathname)
		},
		{
			key: "2",
			label: <span>关闭其他</span>,
			onClick: () => closeMultipleTab(pathname)
		},
		{
			key: "3",
			label: <span>关闭全部</span>,
			onClick: () => closeMultipleTab()
		}
	];
	return (
		<Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }} trigger={["click"]}>
			<Button className="more-button" type="primary" size="small">
				更多
				<DownOutlined />
			</Button>
		</Dropdown>
	);
};
export default MoreButton;
