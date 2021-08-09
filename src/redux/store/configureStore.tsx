import {createStore} from 'redux';
// 安装redux-devtools-extension的可视化工具。
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from '../reducer/reducer';

const configureStore = (preloadedState: any) => createStore(reducer, composeWithDevTools());
export default configureStore;
