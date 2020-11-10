import React, { Component } from 'react'
import UserService from '../../Services/UserService'

class ViewUserComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {}
        }

        this.listUser = this.listUser.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( res => {
            this.setState({user: res.data.body});
        }).catch(error=>{
            alert(error.message)
        });
    }

    listUser(){
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <h3 className = "text-center"> View User Details</h3>
                <br></br>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.listUser}> List User</button>
                 </div>
                <div className = "card col-md-6 offset-md-3">
                    
                    <div className = "card-body">
                        <div className = "row">
                            <label> First Name: </label>
                            <div style={{marginLeft:10}}> { this.state.user.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Last Name: </label>
                            <div style={{marginLeft:10}}> { this.state.user.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Status: </label>
                            <div> { this.state.user.isActive ? <p style={{marginLeft:10,color: "white",backgroundColor:"green",padding:5,textAlign:"center"}}>Active</p>: <p style={{marginLeft:10,color: "white",backgroundColor:"red",padding:5,textAlign:"center"}}>De-active</p>}</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewUserComponent