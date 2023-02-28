import React from 'react';
// import Style Auth
import '../../style/auth.scss';
// import Link from react router
import {Link} from 'react-router-dom';
//import axios tool
import axios from 'axios';
// Import react strap Library
//Create Register Bage
import { ThreeDots   } from  'react-loader-spinner'

import {Alert} from '../../Tools/tool'

class Remember extends React.Component {
    state = {
        email:"",
        password2:"",
        error:"",
        password:'',
        isLoading:false,
    }
    onChange = e =>{
        this.setState({[e.target.name]:e.target.value , error:''})
    }
    onSubmit = e =>{
        e.preventDefault();
        let data ={
            username:this.state.email,
            password2:this.state.password2,
        }
        this.setState({error:""})
        axios.post(this.props.match.path,data)
        .then(res =>{
            // localStorage.setItem('token',res.data.token)
            // localStorage.setItem('id',res.data._id)
            // axios.defaults.headers.common = {'authorization':res.data.token}
            // window.location.replace('/')
            this.setState({isLoading:true , error:''})
            setTimeout(()=>{this.setState({password:res.data.password,isLoading:false})},5000)
            
        })
        .catch(err =>{
            this.setState({isLoading:true})

            setTimeout(()=>{this.setState({isLoading:false,error:err.response.data.message})},5000)

        })
    }
    LoginComponent(){
        if(this.state.isLoading){
            return(
                <div style={{width:'100%' , heigth:'90%' , display:'flex' , justifyContent: 'center' , alignItems: 'center',flexDirection:'column'}}>
                            <ThreeDots  
                            heigth="60"
                            width="60"
                            color='rgb(22, 101, 165)'
                            ariaLabel='loading'
                            style={{display:'block'}}
                        />
                        <br/>
                    </div>
            )
        }
        return(
            <div className='Register'>

                <form onSubmit={this.onSubmit}>

                    <p>تسجيل الدخول</p>
                    <hr/>

                    {this.state.password ? <div style={{textAlign: 'center' , backgroundColor:'rgba(149, 196, 223,0.5)' , padding:'10px'}}>{this.state.password}:  كلمة المرور الاساسية</div>:''}
                    <span>البريد الالكتروني</span>

                    <input autoComplete='true' dir='auto' type='email' placeholder='ادخل البريد الالكتروني هنا' name='email' onChange={this.onChange} value={this.state.email}></input>
                    <span>كلمة المرور الاحتياطية</span>
                    
                    <input autoComplete='true' dir='auto' type='password' placeholder='ادخل كلمة المرور هنا' name='password2' onChange={this.onChange}  value={this.state.password2}></input>

                    <span style={{color:'rgba(0,0,0,0.6)',marginTop:'20px'}}>اذا نسيت كلمة المرور الاحتياطية فلا يوجد طريقه لاسترجاعها  فحاول التواصل مع الدعم الفني</span>
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
export default Remember;