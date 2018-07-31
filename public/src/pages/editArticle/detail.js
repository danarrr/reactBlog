/**
 * 后台
 * 编辑文章详情
 *
 */
import React from 'react';
import { Table, Icon, Divider, Button, BackTop, Input, Form, Collapse, Select, notification} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './../style.css'

// import { increaseAction } from './../../action'
import ContentService from './../../service/articleListInfo';

const { TextArea } = Input;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
const children = ["ES6", "react", "node", "other"]
const openNotificationWithIcon = (type) => {
    notification[type]({
        message: '提交成功~',
        description: '留下继续编辑',
    });
};

class EditArticleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datalist:[],
            id: props.value ? props.value : Math.floor(Math.random()*100000000+1),
        }
    }

    async getArticleList() {
        const params = {id: this.state.id}
        let { success, data, message, total } = await ContentService.getAllData(params);
        if(data){
            this.props.form.setFieldsValue({...data[0]})//初始化数据
        }
    }

    async save(val){
        const { title, content, desc } = val
        const param = {
            id: this.state.id,
            name: "管理员",
            author: "danarrr",
            title,
            tag: "js, chrome",
            key: this.state.id,
            desc,
            content
        }
        let { success, data, message } = await ContentService.saveArticle(param);
        if(success){
            openNotificationWithIcon('success')
        }
        this.setState({data})
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.save({...values})
            if (!err) {
               console.log('Received values of form: ', values);
            }
        });
     }

  // handleSelect = (value) => {
  //     let tag = "";
  //     value.forEach(item => {tag += `${item},`})
  //     this.setState({tag})
  //
  // }
  componentWillMount(){
      this.getArticleList()
  }

  render() {
      const { getFieldProps } = this.props.form;
      const {title, content, child, tag} = this.state;
    return (
      <Form>
        <Collapse defaultActiveKey={['0']} >
          <Panel header="markdown正文编辑器" key="1">
            <iframe width="100%" height="500px" src="https://www.zybuluo.com/mdeditor"></iframe>
          </Panel>
        </Collapse>
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={tag}
            onChange={this.handleSelect}
            {...getFieldProps('tag')}
          >
            {children.map(item => (<Option value={item} key={item}>
                {item}</Option>
            ))}
          </Select>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Input {...getFieldProps('title')} placeholder={title ? title : "文章标题"}/>
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Input {...getFieldProps('desc')} placeholder="输入文章描述"/>
        </FormItem>


        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <TextArea
           {...getFieldProps('content')}
            placeholder={content ? content : "手动复制以上markdown内容到介里"}
            />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

// EditArticleDetail.propTypes = {//类型检测可有可无
//   onIncreaseClick: PropTypes.func.isRequired
// }

function mapStateToProps(state) {//用于更新ui组件的值得  UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
  return {
    value: state.id
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: (id) => {
      dispatch({type: "increase", id})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditArticleDetail));
