import React from 'react';
// import Style Auth
import '../../style/auth.scss';
// import Link from react router
import {Link} from 'react-router-dom';
//import axios tool
import axios from 'axios';
// Import react strap Library
//Create Register Bage

import {Alert} from '../../Tools/tool'

class Login extends React.Component {
    state = {
        email:"",
        password:"",
        error:""
    }
    onChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e =>{
        e.preventDefault();
        let data ={
            username:this.state.email,
            password:this.state.password,
        }
        axios.post(this.props.match.path,data)
        .then(res =>{
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('id',res.data.id)
            axios.defaults.headers.common = {'authorization':res.data.token}
            window.location.replace('/')
        })
        .catch(err =>{
            this.setState({error:err.response.data.message})
        })
    }
    LoginComponent(){
        return(
            <div className='Register'>

                <form onSubmit={this.onSubmit}>

                    <p>تسجيل الدخول</p>
                    <hr/>
                    <span>البريد الالكتروني</span>

                    <input autoComplete='true' dir='auto' type='email' placeholder='ادخل البريد الالكتروني هنا' name='email' onChange={this.onChange} value={this.state.email}></input>
                    <span>كلمه المرور</span>
                    
                    <input autoComplete='true' dir='auto' type='password' placeholder='ادخل كلمة المرور هنا' name='password' onChange={this.onChange}  value={this.state.password}></input>

                    <div>
                    <Link to='/api/Register'>? ليس لدي حساب <span>انشاء حساب</span></Link>

                    </div>
                    <br/>
                    <Link to='/api/remember'>?هل نسيت كلمة المرور </Link>
                    
                    <button>تسجيل الدخول</button>
                </form>
            </div>
        )
    }
    render(){
        if(!localStorage.getItem('token') && !localStorage.getItem('id')){
        return(
            <div>
                {this.state.error ? <Alert background='danger' width='250px' >{this.state.error}</Alert>:''}
                {this.LoginComponent()}

            </div>

        )
        }else{
            window.location.href='/'
        }
    }
}
export default Login;