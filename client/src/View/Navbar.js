import React from 'react';
import '../style/navbar.scss';
import axios from 'axios';
//Create Navbar 


class Navbar extends React.Component {
    state = {
        menu:'menuh',
        content:['الرئيسية' , 'اسئلة و أجوبة' , 'دروس ومقالات']
    }
    Button(){
        return(
            <div className='Buttons'>
              
                    <div className='Button1' onClick={()=>{window.location.href='/api/Register'}}>انشاء حساب</div>
                     <div className='Button1' onClick={()=>{window.location.href='/api/login'}}>تسجيل</div>
            </div>
           
        )
    }
  
    Button2(){
        return(
            <div className='Buttons'>
              
                <div className='Button1' onClick={()=>{localStorage.removeItem('token'); localStorage.removeItem('id'); window.location.reload()}}>تسجيل الخروج</div>
            </div>
        )
    }
    NavbarComponent(){

        return(
            <div className='navbar'>
                {localStorage.getItem('token') && localStorage.getItem('id') ? this.Button2(): this.Button() }
                
                <ul>
                    <li><a  href='/'>{this.state.content[0]}</a></li>
                    <li><a href='/post'>{this.state.content[1]}</a></li>
                    <li><a href='/lessons'>{this.state.content[2]}</a></li>
                    <li><a href={'/api/profile/'+localStorage.getItem('id')}>الملف الشخصي</a></li>
              
                </ul>
                
                <div className='menu'>
                    <div className='icon' onClick={()=>{
                        if(this.state.menu === 'menuh' || this.state.menu === 'menuD'){
                            this.setState({menu:'menu'})
                        }else{
                            this.setState({menu:'menuD'})
                        }
                    }}>
                        {<img src='../../img_web/menu.png'></img> || <img src='../img_web/menu.png'  alt='menu'></img> || <img src='./img_web/menu.png' alt='menu'></img> }
                    </div>
                    <div className={this.state.menu}>
                        <p><a href='/'>{this.state.content[0]}</a></p>
                        <p><a href='/post'>{this.state.content[1]}</a></p>
                        <p><a href='/lessons'>{this.state.content[2]}</a></p>
                        {localStorage.getItem('token') && localStorage.getItem('id') ? '' :<div className='Button1' onClick={()=>window.location.href='/api/login'}>تسجيل</div> }
                        {localStorage.getItem('token') && localStorage.getItem('id') ? '' :<div style={{marginTop:30}} className='Button2' onClick={()=>window.location.href='/api/register'}>انشاء حساب</div> }

                        {localStorage.getItem('token') && localStorage.getItem('id') ?<p><a href={'/api/profile/'+localStorage.getItem('id')}>الملف الشخصي</a></p>: ''}
                        {localStorage.getItem('token') && localStorage.getItem('id') ? <div className='Button1' onClick={()=>{localStorage.removeItem('token'); localStorage.removeItem('id'); window.location.reload()}}>تسجيل الخروج</div> : ''}

                    </div>
                   
                </div>
                
            </div>
        )
        
    }


    render(){
     return(
        this.NavbarComponent()

     )
    }
}
export default Navbar;