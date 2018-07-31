/**
 * 文章列表页
 *
 *
 */

import React from 'react';
import { Table, Icon, Divider } from 'antd';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './../style.css'
import Particle from 'zhihu-particle';

import ContentService from './../../service/articleListInfo';

'use strict';

class AricleContent extends React.Component {
  constructor(props, context) {
      super(props);
      this.state = {
          datalist: [],
          id: props.id,
      }
  }
  componentWillMount() {
      this.getArticleList()
      //TODO 刷新页面数据丢失
  }

  componentDidMount() {
      new Particle(this.background, {interactive: true, density: 'low'});
  }

  async getArticleList() {
      const params = { id: this.state.id }
      let { success, data, message, total } = await ContentService.getAllData(params);

      data.forEach(item => {
          const { title, createTime, tag, content} = item
          this.setState({
              name: item.author,
              title,
              createTime,
              tag,
              content,
          })
      })
  }

  render() {
      const {name, title, createTime, tag} = this.state;
      const { id } = this.state//redux传下来的值
      return (
          <div className="content-box" >
            <div
                ref={(background) => {
                    this.background = background;
                }}
                className="background"/>
            <h1><a>{title}</a></h1>
            <p>
                <Icon type="calendar" />发表于{createTime} |
                <Icon type="inbox" />分类于{tag} |
                <Icon type="eye-o" />阅读数100
            </p>
            <ReactMarkdown source={this.state.content} />
  		</div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return state
}
export default connect(mapStateToProps)(AricleContent);
