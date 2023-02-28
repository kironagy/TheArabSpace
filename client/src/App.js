import React from 'react';
import './App.css';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import axios from 'axios';
import Home from './View/Home'
import Register from './View/Auth/Register'
import Login from './View/Auth/login';
import Posts from './View/posts/posts';
import CreatePost from './View/posts/createPost';
import ShowPost from './View/posts/showPost';
import Remember from './View/Auth/remeber';
import Lessons from './View/Questions/Lessons';
import ShowLesson from './View/Questions/showLessons';
import Terms from './View/terms';
import CreateLessons from './View/Questions/createLessons';
import Profile from './View/profile';
import NotFound from './View/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar:''
    }
    
   
    
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = {'authorization':token}
    axios.get('/api/me')
    .then(res =>{
      if(res.data.id !== localStorage.getItem('id')){
        localStorage.setItem('id',res.data.id)
        
      }
    })
    .catch(err =>{
      
        if(err.response.data.message === 'Not found user'){
          localStorage.removeItem('token');
          localStorage.removeItem('id');
        }
    })
  }
  render(){
    return (
      <div className='App'>
      <Router >
        <Switch >
          <Route  path='/' exact component={Home}></Route>
          <Route  path='/post' exact component={Posts}></Route>
          <Route  path='/post/terms' exact component={Terms}></Route>
          <Route  path='/Lessons' exact component={Lessons}></Route>
          <Route  path='/Lessons/show/:id' exact component={ShowLesson}></Route>
          <Route  path='/Lessons/create' exact component={CreateLessons}></Route>
          <Route  path='/post/create' exact component={CreatePost}></Route>
          <Route  path='/post/show/:id' exact component={ShowPost}></Route>
          <Route  path='/api/profile/:id' exact component={Profile}></Route>
          <Route  path='/api/Register' exact component={Register}></Route>
          <Route  path='/api/Login' exact component={Login}></Route>
          <Route  path='/api/remember' exact component={Remember}></Route>
          <Route  path='*' exact component={NotFound}></Route>
        </Switch>
      </Router>
      </div>
     
    );
  }
 
}

export default App;
