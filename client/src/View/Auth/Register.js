import React from 'react';
// import Style Auth
import '../../style/auth.scss';
// import Link from react router
import {Link} from 'react-router-dom';
//import axios tool
import axios from 'axios';
//import My Library
import {Alert} from '../../Tools/tool'
//Create Register Bage
class Register extends React.Component {
    state = {
        name:"",
        email:"",
        password:"",
        password2:"",
    }
    onChange = e =>{
        if(e.target.name === 'name'){
            this.setState({[e.target.name]:e.target.value.replace(" ","_").replace("__" , "_")})
            
        }else{
            this.setState({[e.target.name]:e.target.value})

        }
    }
    onSubmit = e =>{
        e.preventDefault();
       
        if(this.state.name && this.state.email && this.state.password && this.state.password2 !==''){
            if(this.state.name.endsWith('_')){
           
                this.setState({name:this.state.name.slice(0,this.state.name.length-1)})
            }
            let data ={
                name:this.state.name,
                username:this.state.email,
                password:this.state.password,
                password2:this.state.password2,
            }
            axios.post(this.props.match.path,data)
            .then(res =>{
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('id',res.data.id)
                axios.defaults.headers.common = {'authorization':res.data.token}
                window.location.replace('/')
            })
            .catch(err =>{
                this.setState({error : err.response.data.message})
            })
        }else{
            this.setState({error:'يجب عليك ادخال جميع البيانات'})
        }
     
    }
    RegisterComponent(){
        return(
            <div className='Register'>

            <form onSubmit={this.onSubmit}>
                <p>انشاء حساب جديد</p>
                <hr/>
                <span>اسمك بالكامل</span>
                <input autoComplete='true' dir='auto' type='text' placeholder='ادخل اسمك هنا' name='name' value={this.state.name} onChange={this.onChange} ></input>
                <span>البريد الالكتروني</span>
    
                <input dir='auto' type='email' placeholder='ادخل البريد الالكتروني هنا' name='email' onChange={this.onChange} value={this.state.email}></input>
                <span>كلمه المرور</span>
                
                <input autoComplete='true' dir='auto' type='password' placeholder='ادخل كلمة المرور هنا' name='password' onChange={this.onChange}  value={this.state.password}></input>
                <span>كلمة المرور الاحتياطية</span>
    
                <input autoComplete='true' dir='auto' type='password' placeholder='ادخل كلمة المرور الاحتياطية هنا' name='password2' onChange={this.onChange}  value={this.state.password2}></input>
                <div>
                <Link to='/api/login'>? لدي حساب بالفعل <span>تسجيل</span></Link>
    
                </div>
                <button>انشاء الحساب </button>
            </form>
        </div>
        )
    
    }
    render(){
        if(!localStorage.getItem('token') && !localStorage.getItem('id')){
            return(
                <div>
                    {this.state.error ? <Alert background='danger'>{this.state.error}</Alert>:''}

                    {this.RegisterComponent()}
                </div>
               )
        }else{
            window.location.href='/'
        }
       
    }
}
export default Register;