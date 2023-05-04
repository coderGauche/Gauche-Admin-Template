/*
 * @Author: Gauche楽
 * @Date: 2023-05-04 21:12:38
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-04 21:12:47
 * @FilePath: /Gauche-admin-template/src/components/svgIcon/index.tsx
 */
interface SvgProps {
	name: string; // 图标的名称 ==> 必传
	color?: string; //图标的颜色 ==> 非必传
	prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
	iconStyle?: { [key: string]: any }; // 图标的样式 ==> 非必传
}

export default function SvgIcon(props: SvgProps) {
	const { name, prefix = "icon", iconStyle = { width: "100px", height: "100px" } } = props;
	const symbolId = `#${prefix}-${name}`;
	return (
		<svg aria-hidden="true" style={iconStyle}>
			<use href={symbolId} />
		</svg>
	);
}
