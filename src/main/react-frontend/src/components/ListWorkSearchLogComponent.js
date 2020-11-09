import React, { Component } from 'react';
import WorkSearchLogService from '../services/WorkSearchLogService';

class ListWorkSearchLogComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.match.params.id,
            userName: '',
            workSearchLogs: []
        }
        this.editLog = this.editLog.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
        this.addLog = this.addLog.bind(this);
        this.viewLog = this.viewLog.bind(this);
    }

    editLog(id, userId){
        this.props.history.push(`/add-work-search-log/${id}/${userId}`);
    }

    deleteLog(id){
        WorkSearchLogService.deleteWorkSearchLog(id).then( res => {
            this.setState({workSearchLogs: this.state.workSearchLogs.filter(wsl => wsl.id !== id)});
        });
    }

    addLog(id) {
        this.props.history.push(`/add-work-search-log/_add/${id}`);
    }

    viewLog(id){
        this.props.history.push(`/view-log/${id}`);
    }

    cancel(){
        this.props.history.push('/users');
    }

    componentDidMount() {
        WorkSearchLogService.getWorkSearchLogsByUserId(this.state.userId).then(res => {
            this.setState({workSearchLogs: res.data});
        });
    }

    render() {
        return (
            <div>
               <h2 className="text-center">Work Search Detail Log</h2> 
               <div className = "row">
                   <button className = "btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>
               </div>
               <div className="row">
                   <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date of Activity</th>
                                <th>Work Search Activity</th>
                                <th>Type of Job</th>
                                <th>Employer/Service/Agency</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.workSearchLogs.map (
                                    wsl => 
                                    <tr key = {wsl.id}>
                                        <td> {wsl.activity.activityDate} </td>
                                        <td> {wsl.activity.activity} </td>
                                        <td> {wsl.activity.job} </td>
                                        <td> {wsl.esa.employerServiceAgency} </td>
                                        <td>
                                            <button onClick={ () => this.editLog(wsl.id, wsl.user.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteLog(wsl.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewLog(wsl.id)} className="btn btn-info">View Log</button> 
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

export default ListWorkSearchLogComponent;