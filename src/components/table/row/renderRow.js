import  React, {Component} from 'react';
import RenderDeleteButton from './deleteBtn/';

const API = require('../../../config/api');
const UTILS = require('../../../config/Utils');

class RenderRows extends Component{

  constructor(props){
    super(props);

    this.state = {
      fname: '',
      lname: '',
      filterdData: ''
    }

    this.onDeleteRow = this.onDeleteRow.bind(this);
  }

  editFunction(recordSet,targetEle, updatedFName, lnamePlaceHolder){
    let obj= {
      "id": recordSet.id,
     "email": recordSet.email,
     "fname": updatedFName.value,
     "lname": lnamePlaceHolder.value
   }
    
    new Promise(function(resolve, reject){
      API.updateData(recordSet.id,obj,resolve, reject)
    }).then(function(data){
      this.props.data.fname = data.fname;
      this.props.data.lname = data.lname;
     
      targetEle.innerText = "Edit";
      targetEle.nextElementSibling.classList.remove('show');
      targetEle.nextElementSibling.classList.add('hide');

    }.bind(this))
  }

  handleChange = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  toggleEdit(e, recordSet){
    e.preventDefault();
    let targetEle = e.target;
    let firstTimeuser = true;

    if(targetEle.innerText === "Edit" && firstTimeuser){
      targetEle.innerText = "Update";
      UTILS.toggleElementClass(this.refs.cancelBtn);
      firstTimeuser = false;
    }
    
    if(targetEle.innerText === "Cancel"){
      UTILS.toggleElementClass(targetEle);
      targetEle.previousElementSibling.innerText = "Edit";
    }

    UTILS.toggleElementClass(this.refs.fnamePlaceHolder);
    UTILS.toggleElementClass(this.refs.lnamePlaceHolder);
    UTILS.toggleElementClass(this.refs.updatedFName);
    UTILS.toggleElementClass(this.refs.updatedLName);

    if(targetEle.innerText === "Update" && firstTimeuser){
      let updatedFName = this.refs.updatedFName;
      let lnamePlaceHolder = this.refs.updatedLName;
      this.editFunction( recordSet,targetEle,  updatedFName, lnamePlaceHolder)
    }
  }

  updateState = ( data ) => {
    this.setState({
      data
    });
  }

  onDeleteRow(data){
    this.props.onDeleteRow(data)
  }

  render(){
    let recordSet =  this.props.data;
    return(
      <div className="rTableRow">
        <div className="rTableCell">{recordSet.id}</div>
        <div className="rTableCell">{recordSet.email}</div>
        <div className="rTableCell">
          <span ref="fnamePlaceHolder"> {this.state.fname === '' ? recordSet.fname : this.state.fname} </span>
          <input ref="updatedFName" type="text" name="fname" className="hide" value={this.state.fname === '' ? recordSet.fname : this.state.fname } onChange={(e) => {this.handleChange(e)}}/>
        </div>
        <div className="rTableCell">
        <span ref="lnamePlaceHolder"> { this.state.lname === '' ? recordSet.lname : this.state.lname } </span>
          <input ref="updatedLName" type="text" name="lname" className="hide" value={this.state.lname === '' ? recordSet.lname : this.state.lname } onChange={(e) => {this.handleChange(e)}}/>
        </div>
        <div className="rTableCell">
          <button onClick={ (e) => {this.toggleEdit(e, recordSet)}}>Edit</button> 
          <button ref="cancelBtn" className="hide" onClick={ (e) => {this.toggleEdit(e, recordSet)}}>Cancel</button>
        </div>

        <div className="rTableCell">
          <RenderDeleteButton onDeleteRow={this.onDeleteRow}  updateState={this.updateState} record={recordSet}/>
        </div>
      </div>
    )
  }
}
export default RenderRows;