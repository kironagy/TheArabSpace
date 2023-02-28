import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { ThreeDots   } from  'react-loader-spinner'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



class ShowPost extends React.Component {
    state={
        post:{},
        err:'',
        isLoading:true,
        avatar:'',
        name:'',
        comments:[],
        comment:'',
        like:false
    }
    Comment = () =>{
        return(
            <form onSubmit={this.onSubmit}>
            <div className='Comments'>
            <p>{this.state.comments.length}: التعليقات</p>
            <div>
            {this.state.comments.map(comment =>{
                return(
                    <div className='comments'>
                        <span style={{position:'relative',top:'-15px',right:'15px'}}>{comment.author.name}</span>

                   <a href={'/api/profile/'+comment.author._id}><img src={'../../img_users/'+comment.author.avatar} width='40px'></img></a>
                        <p dir='auto' style={{color:'rgba(0,0,0,0.6)' , fontSize:'14px',top:'-30px',right:'47px'}}>{moment(comment.create_at).calendar()} :منذ</p>

                        {/* <pre dir='auto'><p dir='auto'>{comment.content}</p></pre> */}

                        <div dir='auto' id='comment' dangerouslySetInnerHTML={{__html:comment.content}}></div>
                    </div>
                )
            })}
            </div>
    
            <div className='Add_comment'>
            <CKEditor
                                
                                editor={ClassicEditor}
                                config={this.editorConfiguration }
                                data={this.state.content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({ comment: data })
                                }}
                                

                            />
                <button id='btn'>أضافه تعليق</button>
            </div>
        </div>
        </form>
        )
    }
    onSubmit = e=>{
        e.preventDefault();
        if(this.state.comment !==''){
            let data ={
                content:this.state.comment
            }
            axios.post(this.props.match.params.id , data)
            .then(res =>{
                window.location.reload();
            })
        }
      
    }
    onChange = e =>{
        this.setState({comment:e.target.value})
    }
    componentDidMount(){
        axios.get('/post/show/'+this.props.match.params.id)
        .then(res =>{
            res.data.likes.map(like =>{

                if(like._id === localStorage.getItem('id')){
                    this.setState({like:true})
                }else{
                    this.setState({like:false})
                }
            })
            this.setState({post:res.data , avatar:res.data.author.avatar , name:res.data.author.name ,isLoading:false, comments:res.data.comments})
        })
        .catch(err =>{
            this.setState({isLoading:false})
        })
    }
    render(){
        if(axios.defaults.headers.common.authorization !== null){
            if(this.state.isLoading){
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
                 
    
                    <div className='All_posts2'>
                       
                            <div>
                                    <div>
                                    {this.state.post.author._id === localStorage.getItem('id') ?<div className='DropM'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                            </svg>

                                            
                                            <div className='menu'>
                                                
                                                <p security='true' onClick={()=>{axios.patch('/post/show/'+this.props.match.params.id).then(window.location.href='/post')}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-trash" viewBox="0 0 15 15">
                                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                 <path  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                              </svg>حذف السؤال</p>
                                              <p onClick={()=>window.location.href=`/api/profile/${this.state.post.author._id}`}>عرض الملف الشخصي صاحب السؤال</p>
                                            </div>
                                        </div>: ''}                            
                                        <span dir='auto' style={{position:'relative' , top:'-35px' , right:'-80px' , color:'rgba(0,0,80,1)' }}>{this.state.name}</span>
                                        <span style={{ color:'rgba(0,0,90,0.7)' , fontSize:'14px' , position:'relative',right:'10px',top:'-10px'}}>{moment(this.state.post.create_at).calendar()}</span>
                                        <a href={'/api/profile/'+this.state.post.author._id}><img className='avatar' style={{width:'45px' , maxWidth:'45px'}} src={'../../img_users/'+this.state.avatar}></img></a>

                                    </div>
                                <pre dir='auto' id='title'><p  dir='auto' style={{fontWeight: '100' , fontSize:"21px" ,position:'relative', color:'rgba(0,0,0,0.6)' }}>{this.state.post.title}</p></pre>

                                <pre><p id='content' dir='auto' style={{fontSize:'16px', color:'rgba(0,0,0,0.8)'}} dangerouslySetInnerHTML={{__html:this.state.post.content}}></p></pre>
                            {   <span style={{fontWeight:'100' , margin:'10px',position:'relative',top:'-10px'}} dir='auto'> {this.state.post.likes.length} أعجبات </span> || ''}
                                {this.state.like?
                                <img src='../../img_web/heart2.png' width='30' onClick={()=>{
                                    axios.delete('/post/show/'+this.props.match.params.id)
                                    .then(res =>{

                                        window.location.reload();

                                        this.setState({like:false})

                                    })
                                    .catch(err =>{

                                        window.location.reload();
                                    })
                                }}></img> 
                                
                                
                                :  <img src='../../img_web/heart.png'  width='30' onClick={()=>{
                                    axios.put('/post/show/'+this.props.match.params.id)
                                    .then(res =>{

                                        window.location.reload();
                                        this.setState({like:true})

                                    })
                                    .catch(err =>{
                                        window.location.reload();
                                    })
                                }}></img> }
                                
                            </div>
                                <hr style={{border:'1px solid rgba(0,0,0,0.05)'}}/>
                                <div>
    
                                </div>
                                {this.Comment()}
    
                    </div>  
                    
    
                    <div className='add_post_container2'>
                    <Link to='/post/create'>  <button>أضافة سؤال</button></Link>
                    <p><Link to='/post/terms'>كيف تحصل على إجابة لسؤلك؟</Link></p>
                    </div>
                   
                </section>
            )
        }else{
            window.location.href='/api/login'
        }
     
    }
}

export default ShowPost