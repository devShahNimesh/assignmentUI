import React, { Component } from 'react';
import UserService from '../../Services/UserService';


class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.activateUser = this.activateUser.bind(this);
        this.getUserList = this.getUserList.bind(this);
    }

    componentDidMount() {
       this.getUserList();
    }

    deleteUser(id) {
        UserService.deleteUser(id).then(res => {
           this.getUserList();
        }).catch(error=>{
            alert(error.message)
        });;
    }

    activateUser(User) {
        const user = { id: User._id, lastName: User.lastName, firstName: User.firstName, isActive: true }
        UserService.updateUser(user).then(res => {
           this.getUserList();
        });
    }

    getUserList(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data.body.users });
        }).catch(error=>{
            alert(error.message)
        });;
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    render() {

        return (
            <div>
                <h2 className="text-center">User List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> User First Name</th>
                                <th> User Last Name</th>
                                <th> User Status</th>
                                <th style={{ textAlign: "center" }}> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user._id}>
                                            <td> {user.firstName} </td>
                                            <td> {user.lastName}</td>

                                            <td>
                                                {user.isActive ? <p style={{ color: "white", backgroundColor: "green", padding: 5, textAlign: "center" }}>Active</p> : <p style={{ color: "white", backgroundColor: "red", padding: 5, textAlign: "center" }}>De-active</p>}
                                            </td>

                                            <td style={{ textAlign: "center" }}>

                                                <button onClick={() => this.viewUser(user._id)} className="btn btn-info">View </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editUser(user._id)} className="btn btn-info">Update </button>
                                                {
                                                    user.isActive &&
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteUser(user._id)} className="btn btn-danger">  Delete </button>}

                                                {
                                                    !user.isActive &&
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.activateUser(user)} className="btn btn-success">Activate    </button>}

                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListUserComponent