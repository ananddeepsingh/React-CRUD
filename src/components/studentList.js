import React, { Component } from 'react';
import  Table from './table/table';
import  UserDetails from '../components/userDetail';

const API = require('../config/api');

class StudentList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : [],
      props: this.props
    }

    this.onDeleteRow = this.onDeleteRow.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    let _this = this;
    
    new Promise(function(resolve, reject){
      API.getData(resolve, reject)
    })
    .then(function(data){
      _this.setState({
        data
      });
    })
  }

  onLogout = () => {
    this.props.history.push(`/`);
  }

  renderDetails(){
    var userDetailObj = [];

    this.state.data.map( (item,i) => {
      userDetailObj.push(<UserDetails onLogout={this.onLogout} item={item} key={i} />)
    })
    return userDetailObj;
  }

  onDeleteRow(data) {
    this.setState({
      data
    })
  }

  render() {
    return (
      <div className="listWrapper">
        <div id="loader" className="hide"></div>
        <header>
          {this.renderDetails()}
        </header>
        <div id="table">
          <Table data={this.state.data} onDeleteRow={this.onDeleteRow}/>
        </div>
      </div>
    );
  }
}

export default StudentList;
