/**
 * 登录页
 *
 *
 */
'use strict';
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Particle from 'zhihu-particle';

import ContentService from './../../service/userInfo';

const FormItem = Form.Item;

class SignIn extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);//获取表单的值
          this.signIn({...values, id: values.userName})
          };
        })
    }

    async signIn(values){
        console.log("ContentService", values)
        let { success, data, message } = await ContentService.getUserInfo(values);
        if(success){
            window.location = "/manage"
        }
    }


    componentDidMount(){
      new Particle(this.background, {interactive: true, density: 'low'});
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div>
              <div
                ref={(background) => {
                    this.background = background;
                 }}
                 className="background"/>
              <br/><br/><br/>
              <Form onSubmit={this.handleSubmit} style={{maxWidth: 300, margin: '0 auto',zIndex: 999, position:'relative'}}>
                  <FormItem>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                  </FormItem>
              </Form>
         </div>
      );
    }
}

const WrappedNormalLoginForm = Form.create()(SignIn);
export default WrappedNormalLoginForm;
