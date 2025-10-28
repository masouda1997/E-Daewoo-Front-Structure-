import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
	token: {
		fontSize: 16,
		colorPrimary: '#3a87bf',
		fontFamily: 'inherit',
		colorBgLayout: 'transparent',
	},

	components: {
		Menu: {
			subMenuItemBg: 'white',
			itemBorderRadius: 2,
			itemHoverBg: '#f9fbfc',
		},
	},
};

export default theme;
