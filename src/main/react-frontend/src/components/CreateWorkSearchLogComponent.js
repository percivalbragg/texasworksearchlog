import React, { Component } from 'react';
import WorkSearchLogService from '../services/WorkSearchLogService';

class CreateWorkSearchLogComponent extends Component {
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

        this.saveOrUpdateWorkSearchLog = this.saveOrUpdateWorkSearchLog.bind(this);
        this.changeActivityDateHandler = this.changeActivityDateHandler.bind(this);
        this.changeActivityHandler = this.changeActivityHandler.bind(this);
        this.changeJobHandler = this.changeJobHandler.bind(this);
        this.changeEmployerServiceAgencyHandler = this.changeEmployerServiceAgencyHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeZipHandler = this.changeZipHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changePersonContactedHandler = this.changePersonContactedHandler.bind(this);
        this.changeContactEmailHandler = this.changeContactEmailHandler.bind(this);
        this.changeResultHandler = this.changeResultHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
    }

    componentDidMount() {
        if(this.state.id === '_add'){
            return
        }else{
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
    }

    saveOrUpdateWorkSearchLog = (e) => {
        e.preventDefault();
        let wsl = {id: this.state.id, userId: this.state.userId};
        console.log('work search log => ' + JSON.stringify(wsl));

        if(this.state.id === '_add'){
            let wsl = {
                activity: {
                    activityDate: this.state.activityDate, 
                    activity: this.state.activity, 
                    job: this.state.job
                },
                esa: {
                    employerServiceAgency: this.state.employerServiceAgency,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    phoneNumber: this.state.phoneNumber
                },
                contact: {
                    personContacted: this.state.personContacted,
                    contactEmail: this.state.contactEmail
                },
                results: {
                    result: this.state.result,
                    startDate: this.state.startDate
                }
            };
            WorkSearchLogService.createWorkSearchLog(this.props.match.params.userId, wsl).then(res => {
                this.props.history.push('/users');
            });
        }else{
            let wsl = {
                id: this.state.id,
                activity: {
                    activityDate: this.state.activityDate, 
                    activity: this.state.activity, 
                    job: this.state.job
                },
                esa: {
                    employerServiceAgency: this.state.employerServiceAgency,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    phoneNumber: this.state.phoneNumber
                },
                contact: {
                    personContacted: this.state.personContacted,
                    contactEmail: this.state.contactEmail
                },
                results: {
                    result: this.state.result,
                    startDate: this.state.startDate
                },
                user: {
                    userId: this.state.userId
                }
            };
            WorkSearchLogService.updateWorkSearchLog(this.state.userId, this.state.id, wsl).then( res => {
                this.props.history.push('/users');
            });
        }
    }
    
    changeActivityDateHandler = (event) => {
        this.setState({activityDate: event.target.value});
    }

    changeActivityHandler = (event) => {
        this.setState({activity: event.target.value});
    }

    changeJobHandler = (event) => {
        this.setState({job: event.target.value});
    }

    changeEmployerServiceAgencyHandler = (event) => {
        this.setState({employerServiceAgency: event.target.value});
    }

    changeAddressHandler = (event) => {
        this.setState({address: event.target.value});
    }
    changeCityHandler = (event) => {
        this.setState({city: event.target.value});
    }
    changeStateHandler = (event) => {
        this.setState({state: event.target.value});
    }
    changeZipHandler = (event) => {
        this.setState({zip: event.target.value});
    }
    changePhoneNumberHandler = (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    changePersonContactedHandler = (event) => {
        this.setState({personContacted: event.target.value});
    }

    changeContactEmailHandler = (event) => {
        this.setState({contactEmail: event.target.value});
    }

    changeResultHandler = (event) => {
        this.setState({result: event.target.value});
    }

    changeStartDateHandler = (event) => {
        this.setState({start: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Work Search Log</h3>
        }else{
            return <h3 className="text-center">Update Work Search Log</h3>
        }
    }
    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                    <div className = "label label-default"><b>Date, Description of Work Search</b></div>
                                        <div className = "form-group">
                                            <label> Activity Date: </label>
                                            <input placeholder="yyyy-mm-dd" name="activityDate" className="form-control" 
                                                value={this.state.activityDate} onChange={this.changeActivityDateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Activity: </label>
                                            <input placeholder="Activity" name="activity" className="form-control" 
                                                value={this.state.activity} onChange={this.changeActivityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Type of Job: </label>
                                            <input placeholder="Type of Job" name="job" className="form-control" 
                                                value={this.state.job} onChange={this.changeJobHandler}/>
                                        </div>

                                        <div className = "label label-default"><b>Name, Location and Telephone Number of Employer/Service/Agency</b></div>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="employerServiceAgency" className="form-control" 
                                                value={this.state.employerServiceAgency} onChange={this.changeEmployerServiceAgencyHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address: </label>
                                            <input placeholder="Address" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> City: </label>
                                            <input placeholder="City" name="city" className="form-control" 
                                                value={this.state.city} onChange={this.changeCityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> State: </label>
                                            <input placeholder="State" name="state" className="form-control" 
                                                value={this.state.state} onChange={this.changeStateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Zip: </label>
                                            <input placeholder="Zip" name="zip" className="form-control" 
                                                value={this.state.zip} onChange={this.changeZipHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Area Code + Phone#: </label>
                                            <input placeholder="###-###-####" name="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                        </div>

                                        <div className = "label label-default"><b>Contact Information</b></div>
                                        <div className = "form-group">
                                            <label> Person Contacted: </label>
                                            <input placeholder="Person Contacted" name="personContacted" className="form-control" 
                                                value={this.state.personContacted} onChange={this.changePersonContactedHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" name="contactEmail" className="form-control" 
                                                value={this.state.contactEmail} onChange={this.changeContactEmailHandler}/>
                                        </div>

                                        <div className = "label label-default"><b>Results</b></div>
                                        <div className = "form-group">
                                            <label> Result: </label>
                                            <input placeholder="Result" name="result" className="form-control" 
                                                value={this.state.result} onChange={this.changeResultHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Start Date: </label>
                                            <input placeholder="yyyy-mm-dd" name="startDate" className="form-control" 
                                                value={this.state.startDate} onChange={this.changeStartDateHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateWorkSearchLog}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        );
    }
}

export default CreateWorkSearchLogComponent;