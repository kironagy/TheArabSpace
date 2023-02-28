import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";

class ShowLesson extends React.Component {
  state = {
    lesson: {},
    err: "",
    teacher: false,
    isLoding: true,
    content:""
  };
   componentDidMount() {
    axios
      .get("/lessons/show/" + this.props.match.params.id)
      .then((res) => {
        console.log(res.data)
        this.setState({ lesson: res.data , content:res.data.content.replace('a href="','a href="https://') });
        
        setTimeout(() => {
          this.setState({ isLoding: false });
        }, 500);
      })
      .catch((err) => {
        this.setState({ isLoding: false });
      });
    axios.get("/api/me").then((res) => {
      if (res.data.teacher === true) {
        this.setState({ teacher: true });
      } else {
        this.setState({ teacher: false });
      }
    });
  }
  render() {
    if (axios.defaults.headers.common.authorization !== null) {
      if (this.state.isLoding) {
        return (
          <div
            style={{
              width: "100%",
              heigth: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThreeDots
              heigth="60"
              width="60"
              color="rgb(22, 101, 165)"
              ariaLabel="loading"
            />
          </div>
        );
      }
      return (
        <section className="Lessons">

          <div className="Show_Lesson">
          <span id='name'>{this.state.lesson.author.name}</span>
          <span id='Date'>{moment(this.state.lesson.create_at).toNow()}</span>
          <a href={'/api/profile/'+this.state.lesson.author._id}> <img id='avatar' src={`../../img_users/${this.state.lesson.author.avatar}`} width='50'></img></a>

         


            <h1>{this.state.lesson.title}</h1>

            <div className="src">
              <img
                src={"../../img_lessons/" + this.state.lesson.src}
                width="60%"
              ></img>
            </div>

            <div id='content' dir='auto' dangerouslySetInnerHTML={{__html: this.state.content}}></div>
           
            {/* <div id='content' dir='auto' dangerouslySetInnerHTML={{__html: this.state.lesson.content.replace('<figure class="media"><oembed url="https://youtu.be','<figure class="media"><iframe allowfullscreen src="https://youtube.com/embed')}}></div> */}
          </div>

          {/* <div className="add_lesson_container2">
            {this.state.teacher ? (
              <Link to="/lessons/create">
                <button>اضافة مقال</button>
              </Link>
            ) : (
              ""
            )}
            <input placeholder="البحث عن مقال ما ؟"></input>
            <button id="btn">بحث</button>
          </div> */}
        </section>
      );
    } else {
      window.location.href = "/api/login";
    }
  }
}
export default ShowLesson;
