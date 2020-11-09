import React, { Component } from 'react';
import WorkSearchLogService from '../services/WorkSearchLogService';

class ViewLogComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            activityDate: '',
            activity: '',
            job: '',
            employerServiceAgency: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phoneNumber: '',
            personContacted: '',
            contactEmail: '',
            result: '',
            startDate: '',
            userId: this.props.match.params.userId
        }
    }

    componentDidMount() {
        WorkSearchLogService.getWorkSearchLogById(this.state.id).then((res) =>{
            let wsl = res.data;
            this.setState(
            {
                activityDate: wsl.activity.activityDate,
                activity: wsl.activity.activity,
                job: wsl.activity.job,
                employerServiceAgency: wsl.esa.employerServiceAgency,
                address: wsl.esa.address,
                city: wsl.esa.city,
                state: wsl.esa.state,
                zip: wsl.esa.zip,
                phoneNumber: wsl.esa.phoneNumber,
                personContacted: wsl.contact.personContacted,
                contactEmail: wsl.contact.contactEmail,
                result: wsl.results.result,
                startDate: wsl.results.startDate,
                userId: wsl.user.id
            });
        });
}

cancel(){
    this.props.history.push('/users');
    //window.history.back();
}

render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Work Search Log Detail View</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "label label-default"><b>Date, Description of Work Search</b></div>
                                        <div className = "form-group">
                                            <label> Activity Date:&nbsp;</label>
                                            <span>{this.state.activityDate}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Activity:&nbsp;</label>
                                            <span>{this.state.activity}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Type of Job:&nbsp;</label>
                                            <span>{this.state.job}</span>
                                        </div>

                                        <div className = "label label-default"><b>Name, Location and Telephone Number of Employer/Service/Agency</b></div>
                                        <div className = "form-group">
                                            <label> Name:&nbsp;</label>
                                            <span>{this.state.employerServiceAgency}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address:&nbsp;</label>
                                            <span>{this.state.address}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> City:&nbsp;</label>
                                            <span>{this.state.city}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> State:&nbsp;</label>
                                            <span>{this.state.state}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Zip:&nbsp;</label>
                                            <span>{this.state.zip}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Area Code + Phone#:&nbsp;</label>
                                            <span>{this.state.phoneNumber}</span>
                                        </div>

                                        <div className = "label label-default"><b>Contact Information</b></div>
                                        <div className = "form-group">
                                            <label> Person Contacted:&nbsp;</label>
                                            <span>{this.state.personContacted}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email:&nbsp;</label>
                                            <span>{this.state.contactEmail}</span>
                                        </div>

                                        <div className = "label label-default"><b>Results</b></div>
                                        <div className = "form-group">
                                            <label> Result:&nbsp;</label>
                                            <span>{this.state.result}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Start Date:&nbsp;</label>
                                            <span>{this.state.startDate}</span>
                                        </div>

                                        {/* <button className="btn btn-danger" onClick={this.props.history.goBack}>Cancel</button> */}
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        );
    }
}

export default ViewLogComponent;