import {type} from '../action/action';

const ebikeData = (state: any, action: { type: any; menuName: any; }) => {
	switch (action.type) {
		case type.SWITCH_MENU:
			return {
				...state,
				menuName: action.menuName
			};
		default:
			return {...state};
	}
};
export default ebikeData;
