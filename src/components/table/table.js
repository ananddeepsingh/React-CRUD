import  React, {Component} from 'react';
import RenderRows from './row/renderRow';
import Search from './search/search';
import Pagination from "react-js-pagination";

const API = require('../../config/api');
const Utils = require('../../config/Utils');


class Table extends Component{
  constructor(props){
    super(props);

    this.state = {
      data : this.props.data,
      filteredData: [],
      activePage: 1,
      sortAsc: true,
      currentPageData:[],
      isSortedData : false
    }
    this.getData = this.getData.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  getData = () => {
    new Promise(function(resolve, reject){
      API.getData(resolve, reject)
    }).then(function(data){
      this.setState({
        data,
        currentPageData : data
      });
    }.bind(this))
  }

  renderRow(){
    let data;
    if(this.state.isSortedData){
      data = !this.state.filteredData.length 
              ? this.state.currentPageData.slice(0, 4) 
              : this.state.filteredData.slice(0, 4);
    }else{
      data = !this.state.filteredData.length 
              ? this.props.data.slice(0, 4) 
              : this.state.filteredData.slice(0, 4);
    
    }
    
    let row =  data.map( (record, i) =>
        <RenderRows onDeleteRow={this.onDeleteRow} data={record} key={i} />
      )
      
    return row;
  }

  handleStateChange = (dataReceived) => {
    this.setState({
      filteredData : dataReceived
    })
  }

  sorting(e){
    let data = !this.state.filteredData.length ? this.state.data.slice(0, 4) : this.state.filteredData.slice(0, 4);
    let sortedEmail = '';
    let ele = e.target.innerHTML.toLowerCase().trim();
    let sortAsc = this.state.sortAsc;

    if(ele === 'id'){
      if(sortAsc){
        sortedEmail = data.sort((a, b) => this.asc(a.id, b.id));
        this.setState({
          sortAsc : false
        })
      }else{
        sortedEmail = data.sort((a, b) => this.desc(a.id, b.id));
        this.setState({
          sortAsc : true
        })
      }
    }else if(ele === 'email'){
      if(sortAsc){
        sortedEmail = data.sort((a, b) => this.asc(a.email, b.email));
        this.setState({
          sortAsc : false
        })
      }else{
        sortedEmail = data.sort((a, b) => this.desc(a.email, b.email));
        this.setState({
          sortAsc : true
        })
      }
    }else if(ele === 'first name'){
      if(sortAsc){
        sortedEmail = data.sort((a, b) => this.asc(a.fname, b.fname));
        this.setState({
          sortAsc : false
        })
      }else{
        sortedEmail = data.sort((a, b) => this.desc(a.fname, b.fname));
        this.setState({
          sortAsc : true
        })
      }
    }else if(ele === 'last name'){
      if(sortAsc){
        sortedEmail = data.sort((a, b) => this.asc(a.lname, b.lname));
        this.setState({
          sortAsc : false
        })
      }else{
        sortedEmail = data.sort((a, b) => this.desc(a.lname, b.lname));
        this.setState({
          sortAsc : true
        })
      }
    }
    
    this.setState({
      currentPageData: sortedEmail,
      filteredData: [],
      isSortedData: true
    })
  }

  desc(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  }
   
  asc(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  onDeleteRow(data){
    this.props.onDeleteRow(data);
    this.setState({
      filteredData: []
    })
  }

  handlePageChange = (pageNumber)  => {
    --pageNumber;
    var newObj = this.props.data.slice(pageNumber * 4, (pageNumber + 1) * 4);

    this.setState({
      isSortedData: false,
      filteredData:newObj,
      activePage : pageNumber
    })
  }
  
  render(){
    return(
      <div>
        <form ref="myForm">
        <div id="loader" className="loader hide"></div>
        <Search handleStateChange={this.handleStateChange} data={this.state.data} />
        <div className="rTable">
          <div className="rTableHeading">
            <div className="rTableHead" onClick={(e) => {this.sorting(e)}}> ID</div>
            <div className="rTableHead" onClick={(e) => {this.sorting(e)}}> Email</div>
            <div className="rTableHead" onClick={(e) => {this.sorting(e)}}> First Name</div>
            <div className="rTableHead" onClick={(e) => {this.sorting(e)}}> Last Name</div>
            <div className="rTableHead" onClick={(e) => {this.sorting(e)}}> Edit</div>
            <div className="rTableHead" onClick={(e) => {this.sorting(e)}}> Delete</div>
          </div>
          <div className="rTableBody">
            {this.renderRow()}
          </div>
        </div>
        </form>
        <div className="pagination-wrapper">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={4}
            totalItemsCount={this.state.data.length}
            pageRangeDisplayed={3}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}
export default Table;