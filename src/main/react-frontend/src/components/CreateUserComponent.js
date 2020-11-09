import React, { Component } from 'react';
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: '',
            ssn: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSsnHandler = this.changeSsnHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    componentDidMount() {
        if(this.state.id === '_add'){
            return
        }else{
            UserService.getUserById(this.state.id).then((res) =>{
                let user = res.data;
                this.setState({name: user.name,
                    ssn: user.ssn
                });
            });
        }
    }

    saveOrUpdateUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, name: this.state.name, ssn: this.state.ssn};
        console.log('user => ' + JSON.stringify(user));

        if(this.state.id === '_add'){
            let user = {name: this.state.name, ssn: this.state.ssn};
            UserService.createUser(user).then(res =>{
                this.props.history.push('/users');
            });
        }else{
            let user = {id: this.state.id, name: this.state.name, ssn: this.state.ssn};
            UserService.updateUser(user).then( res => {
                this.props.history.push('/users');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeSsnHandler= (event) => {
        this.setState({ssn: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add User</h3>
        }else{
            return <h3 className="text-center">Update User</h3>
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
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> SSN: </label>
                                            <input placeholder="###-##-####" name="ssn" className="form-control" 
                                                value={this.state.ssn} onChange={this.changeSsnHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
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
