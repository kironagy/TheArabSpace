import React from  'react';
import axios from 'axios';
import '../style/profile.scss'
import { ThreeDots   } from  'react-loader-spinner'

class Profile extends React.Component {
    state={
        data:{},
        err:"",
        isLoding:true,
        avatar:{}
    }
    componentDidMount() {
        axios.get('/api/me')
        .then(res =>{
            if(res.data.id !== localStorage.getItem('id')){
                window.location.href='/'
            }
          
        })
        axios.get('/api/profile/'+this.props.match.params.id , {id:this.props.match.params.id})
        .then(res =>{
            this.setState({data:res.data , isLoding:false})
        })
        .catch(err =>{
            this.setState({isLoding:false})
        })
    }
    onChange=e=>{
        this.setState({avatar:e.target.files[0]})
    }
    onSubmit=e=>{
        e.preventDefault();
        const form = new FormData();
        form.append('src',this.state.avatar);
        const headers = ({
            'Content-Type': 'multipart/form-data',
        });
        axios.post('/api/profile/avatar',form,headers)
        .then(res =>{
            this.setState({isLoding:true})
            setTimeout(()=>{
                window.location.reload()
            },1000)
        })
        .catch(err =>{
            this.setState({isLoding:true})
            setTimeout(()=>{
                window.location.reload()

            },1000)
        })
      
    }
    render(){
       
            if(axios.defaults.headers.common.authorization !==null){
                if(this.state.isLoding){
                    return(
                        <div style={{width:'100%' , heigth:'90%' , display:'flex' , justifyContent: 'center' , alignItems: 'center'}}>
                                <ThreeDots  
                                heigth="60"
                                width="60"
                                color='rgb(22, 101, 165)'
                                ariaLabel='loading'
                            />'
                            
                        </div>
                        
                    )
                }
                
                return(
                    <section className='profile'>
                          <div className='poster'>
                            <img src={'../../img_users/'+this.state.data.poster}></img>
                        </div>
                        <div className='img'>
                            {this.state.data._id === localStorage.getItem('id') ?
                            <label for='avatar'>
                             <img src={'../../img_users/'+this.state.data.avatar}></img>
                            </label>: <img src={'../../img_users/'+this.state.data.avatar}></img>
                            }
                            <h1 style={{top:'130px' , fontSize:'17px' , fontWeight:'100'}}> {this.state.data.postsLength.length}: عدد الاسئله </h1>

                            <h1>{this.state.data.name}</h1>

                            {this.state.data.teacher ? <p id='teacher'>معلم</p>:<p id='student'>طالب</p>}

                            <form onSubmit={this.onSubmit}>
                                <input id='avatar' type='file' name='src'  style={{display:'none' }} onChange={this.onChange}/>
                                {this.state.data._id === localStorage.getItem('id') ? <button onClick={()=>setTimeout(()=>{window.location.reload()},1000)}>Set_Photo</button> : ''}
                            </form>

                        </div>

                    </section>
                )
            }else{
                window.location.href='/api/login'
            }
         
        
          
    }
}
export default Profile;