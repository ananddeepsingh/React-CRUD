import  React, {Component} from 'react';

class UserDetails extends Component{
  constructor(props){
    super(props);
    this.setData = this.setData.bind(this);
    this.logout = this.logout.bind(this);
    
  }

  setData(){
    let isRecordExists = this.props.item.email === localStorage.getItem('email') ? true : false;
    let firstName = this.props.item.fname;
    if(isRecordExists){
      return(
        <div >
          <span><strong>Welcome</strong> {firstName}</span>
          <button className='logout' onClick={ this.logout }> Logout</button>
        </div>
      )
    }
  }
  
  logout(){
    alert('User Logout Successfully!!')
    localStorage.removeItem('email');
    this.props.onLogout();
  }

  render(){
    return(
      <div>
        { this.setData() }
      </div>
    )
  }
}
export default UserDetails;