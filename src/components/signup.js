import React, { Component } from 'react';
import '../App.css';

const API = require('../config/api');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Welcome to Student Portal",
      act: 0,
      index: '',
      datas: []
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.validateInputData = this.validateInputData.bind(this);
    this.validateStr = this.validateStr.bind(this);
  }


  onSubmit = (e) => {
    e.preventDefault();
    let _this = this;
    let datas = this.state.datas;
    let email = this.refs.email.value;
    let fname = this.refs.firstName.value;
    let lname = this.refs.lastName.value;
    let password = this.refs.password.value;
    let loader = document.querySelector("#loader");

    if( email && fname && lname && password){
      let obj = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "password": password
      }

      if (this.state.act === 0) {   // new data
        new Promise(function(resolve, reject){
          API.setData(resolve, reject, obj)
        })
        .then(function(data){
          loader.classList.remove("hide");
          setTimeout(function() {
            alert("User Created Signup");
          }, 100);

        })
      }

      this.refs.registerForm.reset();
      this.refs.firstName.focus();

      this.props.history.push(`/`);
    }
  }

  validateInputData(){
    let fname = this.refs.firstName.value;
    let lname = this.refs.lastName.value;

    this.refs.firstName.value = this.validateStr(fname);
    this.refs.lastName.value = this.validateStr(lname);
  }

  validateStr(str){
    let output = str.replace(/\w+/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/\s/g, '');// remove any spaces

    let final = output.replace(/[^a-zA-Z ]/g, "");

    return final;
  }

  render() {

    return (
      <div className="app">
        <div id="loader" className="loader hide"></div>
        <h2>{this.state.title}</h2>
        <form ref="registerForm" name="registerForm" className="registerForm">
          <input type='text' ref='email' placeholder="Your Email" className="formField email" /> <br />
          <input type='text' ref='firstName' placeholder="Your First Name" onChange={this.validateInputData} className="formField firstName" />  <br />
          <input type='text' ref='lastName' placeholder="Your Last Name" className="formField lastName" onChange={this.validateInputData}/>  <br />
          <input type='password' ref='password' placeholder="Your password" className="formField password" />  <br />
          <a href="/" className='customLink'> Login</a>
          <button onClick={(e) => { this.onSubmit(e) }} className="myButton">Submit</button>
          <br />
          
        </form>

      </div>
    );
  }
}

export default App;