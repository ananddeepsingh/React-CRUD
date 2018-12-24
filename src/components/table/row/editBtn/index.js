import  React, {Component} from 'react';
const API = require('../../../../config/api');

class RenderEditButton extends Component{

  constructor(props){
    super(props);
    this.state={
      data: false
    }
  }

  getData(){
    new Promise(function(resolve, reject){
      API.getData(resolve, reject)
    })
  }
  
  toggleEdit = (e) => {
    e.preventDefault();
    let isEditClicked = true;
    this.props.toggleEdit(isEditClicked, e)
  }

  toggleElementClass(ele){
    if(ele.classList.contains('hide')){
      ele.classList.remove('hide');
      ele.classList.add('show');
    }else{
      ele.classList.remove('show');
      ele.classList.add('hide');
    }
  }

  render(){
    return(
      <div>
        <button onClick={ (e) => {this.toggleEdit(e, this.props.recordSet)}}>Edit</button>
        <button ref="cancelBtn" className="hide" >Cancel</button>
      </div>
    )
  }
}
export default RenderEditButton;