import React, { Component } from 'react'
import UserService from '../../Services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            isActive: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changeIsActiveHandler = this.changeIsActiveHandler.bind(this);

    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data.body;
                this.setState({
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isActive: user.isActive
                });
            }).catch(error=>{
                alert(error.message)
            });;
        }
    }

    saveOrUpdateUser = (e) => {
        e.preventDefault();
        let user = { userName: this.state.userName, firstName: this.state.firstName, lastName: this.state.lastName };
        if (this.state.id === '_add') {
            UserService.createUser(user).then(res => {
                this.props.history.push('/users');
            }).catch(error=>{
                alert(error.message)
            });
        } else {
            let updateUser = { id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, isActive: this.state.isActive };
            UserService.updateUser(updateUser).then(res => {
                this.props.history.push('/users');
            }).catch(error=>{
                alert(error.message)
            });;
        }
    }

    changeUserNameHandler = (event) => {
        this.setState({ userName: event.target.value });
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeIsActiveHandler = (event) => {
        this.setState({ isActive: event.target.value });
    }

    cancel() {
        this.props.history.push('/users');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add User</h3>
        } else {
            return <h3 className="text-center">Update User</h3>
        }
    }

    getButtonTitle() {
        if (this.state.id === '_add') {
            return "Save";
        } else {
            return "Update";
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>

                                    {this.state.id === '_add' &&
                                        <div className="form-group" >
                                            <label> User Name : </label>
                                            <input placeholder="User Name" name="userName" className="form-control"
                                                value={this.state.userName} onChange={this.changeUserNameHandler} />
                                        </div>
                                    }

                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Is Active: </label>

                                        <select value={this.state.isActive} onChange={this.changeIsActiveHandler} className="form-control" >
                                            <option value="true">Active</option>
                                            <option value="false">De-Active</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateUser}>{this.getButtonTitle()}</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateUserComponent