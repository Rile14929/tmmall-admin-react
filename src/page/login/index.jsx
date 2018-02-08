import React from 'react';
import PageTitle from 'component/page-title/index.jsx'

import './index.scss'
import MMUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

const _mm = new MMUtil()
const _user = new User()

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            redirect:_mm.getUrlParam('redirect')||'/'
        }
    }
    componentWillMount(){
        document.title = "登录 --MMALL ADMIN"
    }
    // 当用户名密码发生改变
    onInputChange(e){
        let inputValue= e.target.value
        let inputName=e.target.name 
        this.setState({
            [inputName]:inputValue
        })
    }
    onInputKeyUp(e){
        if(e.keyCode==13){
            this.onSubmit()
        }
    }
    // 提交表单
    onSubmit(){
        let loginInfo = {
            username:this.state.username,
            password:this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo)
        // 验证通过
        if(checkResult.status){
            _user.login(loginInfo).then((res)=>{
                _mm.setStorage('userInfo',res)
                // console.log(this.state.redirect ,window.location)
                console.log(res)
                this.props.history.push(this.state.redirect)
            },(errMsg)=>{
                _mm.errorTips(errMsg)
            })
        }else{
            _mm.errorTips(checkResult.msg)
        } 
    }
    render(){
        return (
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">
                            欢迎登录 -MMALL后台管理系统
                        </div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input type="text"
                                        name="username" 
                                        className="form-control" 
                                        placeholder="请输入用户名"
                                        onKeyUp={e=>this.onInputKeyUp(e)} 
                                        onChange={e=>this.onInputChange(e)}
                                        />
                                </div>
                                <div className="form-group">                                 
                                    <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onKeyUp={e=>this.onInputKeyUp(e)}
                                    onChange={e=>this.onInputChange(e)}/>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block"
                                    onClick={e=>{this.onSubmit()}}>登录</button>
                            </div>
                        </div>
                    </div> 
                </div>    
        )
    }
}
export default Login