import React from "react";
import "../../style/lessons.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeDots  } from  'react-loader-spinner'

class Lessons extends React.Component {
  state = {
    lessons: [],
    teacher:false,
    err: "",
    isLoding:true,
    search:'',
    setSearch:''
  };
  componentDidMount() {
    axios.get("lessons/")
      .then((res) => {
        this.setState({ lessons: res.data });
        setTimeout(()=>{this.setState({isLoding:false})},500)
      })
      .catch((err) => {
        this.setState({ err: err.response.data.message });
      });
      axios.get('api/me')
      .then(res =>{
          if(res.data.teacher === true){
              this.setState({teacher: true });
          }else{
            this.setState({teacher: false })
          }
      })
  }
  render() {
    
 
    if (axios.defaults.headers.common.authorization !== null) {
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
      return (
        <section className="Lessons">
          <div className="add_lesson_container">

            {this.state.teacher ?<Link to="/lessons/create">
              <button>اضافة مقال</button>
            </Link>:''}
            <input placeholder="البحث عن مقال ما ؟" onChange={(e)=>{this.setState({setSearch:e.target.value})}}></input>
            <button id='btn' onClick={()=>{this.setState({search:this.state.setSearch})}}>بحث</button>
            
          </div>

          <div className="All_lessons" >
              {this.state.lessons.length <1 ?   <p style={{textAlign:'center'}}>لا يوجد اي دروس الان</p>:<h1>دروس ومقالات</h1>}
            {this.state.lessons.map((lesson) => {
              if(lesson.title.includes(this.state.search) || lesson.content.includes(this.state.search)){
                return (
                  <Link  to={'/lessons/show/'+lesson._id}>
  
                  <div className="lesson">
                    
                      <div className="src">
                        <img src={'./img_lessons/'+lesson.src} loading="lazy"></img>
                      </div>
                        <div className="content">
                        <h1 style={{fontWeight: '0'}} id="title">{lesson.title}</h1>
                        {/* <p id="content">{lesson.content.slice(0,50)}</p> */}
                      </div>
                  </div>
                  </Link>
  
                );
              }
           
            })}
          </div>
        </section>
      );
    } else {
      window.location.href = "/api/login";
    }
  }
}
export default Lessons;
