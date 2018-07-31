/**
 * 后台
 * 文章列表
 *
 */

import React from 'react';
import { Table, Icon, Divider, Button, BackTop, notification } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';//类型检测
import { connect } from 'react-redux'
import './../style.css'

import ContentService from './../../service/articleListInfo';
import UserService from './../../service/userInfo';

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: '添加文章成功！赞~！',
        description: '离目标又进一步了',
    });
};

class EditArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist:[],
      onIncreaseClick: props.onIncreaseClick,
    }
    this.columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
      },{
      title: '作者',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '分类',
      dataIndex: 'tag',
      key: 'tag',
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) =>{
        return (
          <div>
            <Button><Link to="/articleEdit" onClick={ ()=> props.onIncreaseClick(record.id)}>编辑&nbsp;&nbsp;</Link></Button>
            <Button onClick={this.delete.bind(this, record.id)}>删除</Button>
          </div>)
      }
    }];
  }

  componentWillMount() {
    this.getArticleList()
    // this.getUserPermission()
  }

  delete = async(id) => {
    const { success, data, message } = await ContentService.deleteArticle({id});
    if(success){
        openNotificationWithIcon('success');
        this.getArticleList();
    }
  }

  getUserPermission = async() => {
    const userInfo = await UserService.getUserInfo();
  }

  async getArticleList() {
    const { success, data, message, count, content } = await ContentService.getAllData();
    this.setState({
      datalist: data,
      total: count,
    })

  }

  render() {
    const {datalist} = this.state;
    const tableData = datalist.map(item => {
      const { id, author, title, createTime, tag, content } = item
      return {
        id, author, title, createTime, tag, content,
        key: item.id,
      }
    })

    return (
      <div>
        <Button><Link to="/articleEdit" onClick={ ()=> this.props.onIncreaseClick()}>创建文章</Link></Button>
        <Table
            style={{padding:20}}
            columns={this.columns}
            dataSource={tableData}
            Pagination={this.pagination}/>
  		</div>
    );
  }
}

EditArticleList.propTypes = {//类型检测可有可无
  onIncreaseClick: PropTypes.func.isRequired
}

function mapStateToProps(state) {//用于更新ui组件的值得  UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
  return {
    value: state.id
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: (id) => {
      // console.log("onIncreaseClick_____", increaseAction)
      // dispatch(Object.assign({}, increaseAction, {id}))//深浅拷贝写法会影响渲染看一下
      dispatch({type: "increase", id:id})//用户发出的动作变成action对象，传出组件
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditArticleList);
