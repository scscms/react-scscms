import React from 'react';
import ReactDom from 'react-dom';
import { Button, Message } from 'element-react';
import querystring from 'querystring'

import 'element-theme-default';
import '../styles/index.less';


let Index = React.createClass({
    open() {
        Message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
        });
    },

    open2() {
        Message({
            message: '警告哦，这是一条警告消息',
            type: 'warning'
        });
    },

    open3() {
        Message('这是一条消息提示');
    },

    open4() {
        let data = {name:'vip会员',password:'vip123'}
        fetch('/api/login', {
            method: "POST",
            body:querystring.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
        }).catch(function (error) {
            console.log('Request failed', error)
        })
    },

    render() {
        return (
          <div>
              <Button plain={true} onClick={this.open}>成功</Button>
              <Button plain={true} onClick={this.open2}>警告</Button>
              <Button plain={true} onClick={this.open3}>消息</Button>
              <Button plain={true} onClick={this.open4}>ajax</Button>
          </div>
        )
    }
});

ReactDom.render(
  <Index />,
  document.getElementById('app')
);
