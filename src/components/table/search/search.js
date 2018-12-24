import  React, {Component} from 'react';

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      data : this.props.data,
      searchResult : "",
      filteredData: []
    }
  }

  handleStateChange(e){
    e.preventDefault();

    var str = e.target.value;
    this.setState({
      searchResult: str
    });

    const filteredData = this.props.data.filter((item) => {
      return item.email.includes(str.toLowerCase());
    })

    //sending filter data to parent
    this.props.handleStateChange(filteredData);
  }

  render(){
    return(
        <div className="search">
          <input type="text" ref="search" name="serach" placeholder="Search by email" value={this.state.searchResult} onChange={ (e) => {this.handleStateChange(e)}} />
        </div>
    )
  }
}
export default Search;