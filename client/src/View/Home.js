//import React library
import axios from "axios";
import React from "react";
import "../style/home.scss";
// Create Home Bage
class Home extends React.Component {
  state={
    data:[]
  }
  componentDidMount(){
    axios.get('/lessons')
    .then(res =>{
      console.log(res.data)
      this.setState({data:res.data})
    })
    console.log(this.props)
  }
  render() {
    return (
      <section className='home'>
        <div className='Courses'>
        <h1>{this.props.id}</h1>

        <p>الدورات</p>
          <p>دورات شاملة تعتمد على التطبيق العملي، تبدأ معك من الصفر وتأخذك خطوة بخطوة حتى الاحتراف</p>
        <div className="items">
          <div className="item">
            <div className="img">
              <img src="./img_web/javascript-application-development.png"></img>
            </div>
          </div>

          <div className="item">
            <div className="img">
              <img src="./img_web/front-end-web-development.png"></img>
            </div>
          </div>

          <div className="item">
            <div className="img">
              <img src="./img_web/computer-science.png"></img>
            </div>
          </div>

          <div className="item">
            <div className="img">
              <img src="./img_web/ruby-web-application-development.png"></img>
            </div>
          </div>

          <div className="item">
            <div className="img">
              <img src="./img_web/hybrid-mobile-application-development.png"></img>
            </div>
          </div>

          <div className="item">
            <div className="img">
              <img src="./img_web/php-web-application-development.png"></img>
            </div>
          </div>

        </div>
        </div>
        


      </section>
    );
  }
}


export default Home;
