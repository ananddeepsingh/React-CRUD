import  React, {Component} from 'react';
const api = require('../config/api');

export default class login extends Component{
  constructor(props){
    super(props);
    var isUserLoggedIn = localStorage.getItem('email');

    if(isUserLoggedIn){
      this.props.history.push(`/student`);
    }
    this.state = {
      title: "LOGIN",
      data: null,
      isEmailExist: false,
      isPasswordExist: false 
    }
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  
  getData(){
    let _this = this;
    
    new Promise(function(resolve, reject){
      api.getData(resolve, reject)
    })
    .then(function(data){
      _this.setState({
        data
      });
    })
  }

  onLogin = (e) => {
    e.preventDefault();

    let datas = this.state.data;
    let loginEmail = this.refs.loginEmail.value;
    let loginPassword = this.refs.loginPassword.value;
    let loader = document.querySelector("#loader");
    
    if(loginEmail && loginPassword){
      var emailFound = datas.some(item => item.email === loginEmail);
      var passwordFound = datas.some(item => item.password === loginPassword);

      if(emailFound && passwordFound ){
        this.setState({
          isEmailExist : true,
          isPasswordExist : true
        })

        localStorage.setItem('email', loginEmail);
        loader.classList.remove("hide");

        setTimeout(function() {
          this.props.history.push(`/student`);
        }.bind(this), 1000);

      }else{
        loader.classList.remove("hide");

        setTimeout(function() {
          loader.classList.add("hide");
          alert("wrong username/password");
          this.refs.loginForm.reset();
          this.refs.loginEmail.focus();
        }.bind(this), 1000);
      }
    }
  }

  render(){
    return(
      <div className="loginPageWrapper">
        <div id="loader" className="loader hide"></div>
        <h2>{this.state.title}</h2>
        <form ref="loginForm" name="loginForm" className="loginForm">
          <input type='text' ref='loginEmail' placeholder="Your Email" className="formField email" />
          <input type='password' ref='loginPassword' placeholder="Your Password" className="formField password" />
          <a href="/signup" className='customLink'>SignUp Now</a>
          <button onClick={ (e) => {this.onLogin(e)}} className="myButton">Login</button>
        </form>
      </div>
    )
  }
}