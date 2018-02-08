import React from 'react'
import {Link} from 'react-router-dom'
import MMUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
const _mm = new MMUtil()
const _user = new User()

class NavTop extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:_mm.getStorage('userInfo').username ||''
        }
    }
    onlogout(){
        _user.logout().then(res=>{
            _mm.removeStorage('userInfo')
            window.location.href='/login'
        },errMsg=>{
            _mm.errorTips(errMsg)
        })
    }
    render(){
        return(
            <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        <span>欢迎{this.state.username}</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a onClick={()=>{this.onlogout()}}><i className="fa fa-sign-out fa-fw"></i> 退出登录</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        )
    }
}   
export default NavTop