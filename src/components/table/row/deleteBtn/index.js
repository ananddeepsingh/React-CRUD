import  React, {Component} from 'react';
const API = require('../../../../config/api');

class RenderEditBtn extends Component{

  constructor(props){
    super(props);

    this.state={
      data: false
    }
  }

  updateState (e, record){
    e.preventDefault();
    var decision = window.confirm("Are you Sure to Delete this record?")
    let _this = this;

    if(decision){
      new Promise(function(resolve, reject){
        API.deleteRecord(record.id, resolve, reject)
      }).then(function(data){
        
        new Promise(function(resolve, reject){
          API.getData(resolve, reject)
        })
        .then(function(data){
          if(record.email === localStorage.getItem('email')){
            localStorage.removeItem("email");
            alert("Logged in User Deleted ... Redirect to Login Page");
            window.location.replace('/')
          }else{
            _this.props.onDeleteRow(data)
          }
        })
      });
    }
  }

  render(){
    return(
      
      <button onClick={ (e) => {this.updateState(e, this.props.record)}}>Delete</button>
    )
  }
}
export default RenderEditBtn;