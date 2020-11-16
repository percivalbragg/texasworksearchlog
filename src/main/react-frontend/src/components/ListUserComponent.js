import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addWorkSearchLog = this.addWorkSearchLog.bind(this);
        this.displayWorkSearchLogs = this.displayWorkSearchLogs.bind(this);
        this.exportWorkSearchLogsByDate = this.exportWorkSearchLogsByDate.bind(this);
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    addWorkSearchLog(id) {
        this.props.history.push(`/add-work-search-log/_add/${id}`);
    }

    displayWorkSearchLogs(id) {
        this.props.history.push(`/diaplay-work-search-log/${id}`);
    }

    exportWorkSearchLogsByDate(id) {
        this.props.history.push(`/export-work-search-log-by-date/${id}`);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data});
        });
    }
    
    render() {
        return (
            <div>
               <h2 className="text-center">Work Search Users</h2> 
               <div className = "row">
                   <button className = "btn btn-primary" onClick={this.addUser}>Add User</button>
               </div>
               <div className="row">
                   <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Social Security Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map (
                                    user => 
                                    <tr key = {user.id}>
                                        <td> {user.name} </td>
                                        <td> {user.ssn} </td>
                                        <td>
                                            <button onClick={ () => this.editUser(user.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.addWorkSearchLog(user.id)} className="btn btn-info">Add Work Search Log</button> 
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.displayWorkSearchLogs(user.id)} className="btn btn-info">View Work Search Logs</button> 
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.exportWorkSearchLogsByDate(user.id)} className="btn btn-info">Export Logs By Date</button> 
                                        </td>                                       
                                    </tr> 
                                )
                            }
                        </tbody>                      
                   </table>
               </div>
            </div>
        );
    }
}

export default ListUserComponent;