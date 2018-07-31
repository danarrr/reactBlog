/**
 * 定义前端路由表
 * Created by ocean on 18/05/02.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
// import {Route, IndexRoute, browserHistory, Router} from 'react-router';

// 常驻组件
import Header from './components/main/header';
import LeftNav from './components/leftnav';
import Footer from './components/main/footer';
// import Footer from './components/main/footer';
// import Breadcrumb from './components/breadcrumb';

//文章列表页
import Blog from './pages/blog';
import AricleContent from './pages/content';
import Signin from './pages/signin';

//后台系统
import Manage from './pages/editArticle';
import ArticleEdit from './pages/editArticle/detail';
// <Route exact path="/article/:id" component={AricleContent} />


const Root = ({ store }) => (
  <Provider store={store}>
    <Router >
      <div>
        <Header/>

          <Route exact path="/signin" component={Signin} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/article" component={AricleContent} />
          <Route exact path="/manage" component={Manage} />
          <Route exact path="/articleEdit" component={ArticleEdit} />
        <Footer/>
      </div>
    </Router>
  	</Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
