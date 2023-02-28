import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../../style/posts.scss';
import moment from 'moment';
import { ThreeDots   } from  'react-loader-spinner'
class Posts extends React.Component {
    state={
        error:'',
        posts:[],
        isLoding:true,
        search:'',
        setSearch:''
    }
    componentDidMount(){
        axios.get('post')
        .then(res =>{
            this.setState({posts:res.data , isLoding:false})
           res.data.sort((a,b)=>{
               console.log(a.likes.length.sort())
           })
        })
        .catch(err =>{
            this.setState({isLoding:false})
        })
    }
    AddPostComponent(){
        if(axios.defaults.headers.common.authorization !== null){

        return(
            <div className='add_post_container'>
                        
            <Link to='/post/create'> <button>أضافة سؤال</button></Link>
            <p><Link to='/post/terms' style={{textDecoration:'none'}}>كيف تحصل على إجابة لسؤلك؟</Link></p>
                <input placeholder='البحث عن سؤال' value={this.state.setSearch} onChange={(e)=>{
                    this.setState({ setSearch:e.target.value})
                }}></input>
                <button id='btn' onClick={()=>this.setState({search:this.state.setSearch})}>بحث</button>
            </div>
        )
    }else{
        return(
            <div className='add_post_container'>
                        
            <Link to='/api/login'> <button>أضافة سؤال</button></Link>
            <p><Link to='/post/terms' style={{textDecoration:'none'}}>كيف تحصل على إجابة لسؤلك؟</Link></p>
                <input placeholder='البحث عن سؤال' value={this.state.setSearch} onChange={(e)=>{
                    this.setState({ setSearch:e.target.value})
                }}></input>
                <button id='btn' onClick={()=>this.setState({search:this.state.setSearch})}>بحث</button>
            </div>
        )
    }
    }
    postsContainer(){
        
            if(this.state.isLoding){
                return(
                    <div style={{width:'100%' , heigth:'90%' , display:'flex' , justifyContent: 'center' , alignItems: 'center'}}>
                            <ThreeDots  
                            heigth="60"
                            width="60"
                            color='rgb(22, 101, 165)'
                            ariaLabel='loading'
                        />
                    </div>
                    
                )
            }
            return(
                <section className='posts'>

                  {this.AddPostComponent()}
                  
    
                    <div className='All_posts'>
                   

                    {this.state.posts.map(post =>{
                       
                       if(post.title.includes(this.state.search) || post.content.includes(this.state.search)){
                        return(
                            <div className='post'>
                                <Link id='link' style={{textDecoration:'none'}} to={'/post/show/'+post._id}>
                                        <div className='avatar'>
                                            <span style={{color:'rgba(0,0,80,1)'}}>{post.author.name}</span>
    
                                                <img src={`../../img_users/${post.author.avatar}`}></img>
                                                    </div>
                                                    {post.title.length > 50 ?<p dir='auto' id='title' >{post.title.slice(0,50)} ... </p>:<p dir='auto' id='title' >{post.title}</p>}
                                                    <p id='content'>{moment(post.create_at).calendar()}</p>  {/*44 max-length */}
    
                                                    <div className='length_Comment'>
                                            <p>{post.comments.length}</p>
                                        <span>جواب</span>
    
                                     </div>
                                     <p>{post.likes.length} : أعجبات</p>

                            </Link>
                            
                    </div>
                        )
                       }
                      
                    })}

                    {this.state.posts.length < 1 ? <p style={{textAlign: 'center'}}>لا يوجد اي اسئلة </p>:''}
    
                    
    
    
                   </div>
    
                   
                </section>
            )
    }
    render(){
            return(
                this.postsContainer()
            )
       
        
     
    }
}

export default Posts;