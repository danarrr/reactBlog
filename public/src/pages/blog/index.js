/**
 * 文章列表页
 *
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

//style
import { Table, Icon, Divider, Button, BackTop } from 'antd';
import './../style.css'

//component
import Particle from 'zhihu-particle';//知乎Canvas背景插件
import LoadMore from './loadmore'

//service
import ContentService from './../../service/articleListInfo';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist:[],
      onIncreaseClick: props.onIncreaseClick,
      hasNextPg: true,//是否还有翻页
      isLoadingMore: false,//加载中
      currPage: 0,
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
      render: (text, record) =>
      <Link to="/article" onClick={ ()=> props.onIncreaseClick(record.id)}>readmore</Link>
    }];
  }

  componentWillMount() {
      this.getArticleList()
  }

  componentDidMount() {
      new Particle(this.background, {interactive: true, density: 'low'});
  }

  async getArticleList(currPage = 1) {//加载文章
      const param = {
          currPage,
          pageSize: 5,
      }
      let { success, data, message, total, count } = await ContentService.getAllData(param);
      const hasNextPg = parseInt(count/param.pageSize) >= currPage ? true : false
      this.setState({
          datalist:this.state.datalist.concat(data),
          count,
          currPage,
          hasNextPg,
          isLoadingMore: false,
      })
  }

  loadMoreFn() {//加载更多
      this.setState({
           isLoadingMore: true
       })

      const nextPage = this.state.currPage + 1;
      this.getArticleList(nextPage)
  }

  render() {
    const {datalist, isLoadingMore, currPage} = this.state;
    const tableData = datalist.map(item => {
        const {id, author, title, tag, desc, content} = item;
        let imageSrc;
        switch(item.tag){
            case 'js':
                imageSrc = "../../pic/js.png"
            break;
            case 'node':
                imageSrc = "../../pic/nodejs.png"
            break;
            default:
                imageSrc = "../../pic/js.png"
        }
        return {
            id,
            name: author,
            title,
            createTime: item.createTime.replace("T"," ").replace(".000Z"," "),
            tag,
            key: id,
            desc,
            content,
            image: imageSrc,
          }
    })
    return (
      <div>
        {tableData.map(item => {
          return (
            <div className="content-box">
              <h2>{item.title}</h2>
              <p>
                <Icon type="calendar" />发表于{item.createTime} &nbsp;&nbsp;|&nbsp;&nbsp;
                <Icon type="inbox" />分类于{item.tag}&nbsp;&nbsp;|&nbsp;&nbsp;
                <Icon type="eye-o" />阅读数100</p>
              <p>{item.desc}</p>
              <Link to="/article" onClick={()=> this.state.onIncreaseClick(item.id)}>read more</Link>
            </div>
          )
        })
      }
      {this.state.hasNextPg
          ? <LoadMore isLoadingMore={isLoadingMore} LoadMoreFn={this.loadMoreFn.bind(this)}/>
          : <p className="load-more">完。</p>
      }
        <div
            ref={(background) => {
                this.background = background;
            }}
            className="background"/>
      </div>
    );
  }
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
      dispatch({type: "increase", id})//用户发出的动作变成action对象，传出组件
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
