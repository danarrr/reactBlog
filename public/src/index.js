import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
// import App from './App';
import registerServiceWorker from './registerServiceWorker';


import thunk from 'redux-thunk' // redux 作者开发的异步处理方案 可以在action 里传入 dispatch getState
import createLogger from 'redux-logger' // 利用redux-logger打印日志
//引入redux-devtools-extension的可视化工具（有点吊）
import { composeWithDevTools } from 'redux-devtools-extension';//devToolsEnhancer,


//redux
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import counter from './reducers'
import configureStore from './store.js';

// 路由表
import Router from './router';

// 调用日志打印方法 collapsed是让action折叠，看着舒服点
const loggerMiddleware = createLogger({collapsed:true});

// 创建一个中间件集合
// const middleware = [thunk, logger Middleware];
// const store = createStore(
// 	counter,
// 	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  )
const store = configureStore();

console.log("store______", store)
ReactDOM.render(
		<Router  store={store}/>,
	 document.getElementById('root')
);
