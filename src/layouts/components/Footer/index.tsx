/*
 * @Author: Gauche楽
 * @Date: 2023-03-28 15:10:26
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-05 17:30:30
 * @FilePath: /Gauche-admin-template/src/layouts/components/Footer/index.tsx
 */
// import { connect } from "react-redux";
import "./index.less";

const LayoutFooter = () => {
	return (
		<div className="footer">
			<a href="http://www.spicyboy.cn/" target="_blank" rel="noreferrer">
				2022 © Hooks-Admin By Hooks Technology.
			</a>
		</div>
	);
};

// const mapStateToProps = (state: any) => state.global;
// export default connect(mapStateToProps)(LayoutFooter);
export default LayoutFooter;
