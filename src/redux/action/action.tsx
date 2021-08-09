export const type = {
	SWITCH_MENU: 'SWITCH_MENU'
};

export default function switchMenu(menuName: any) {
	return {
		type: type.SWITCH_MENU,
		menuName
	};
}
