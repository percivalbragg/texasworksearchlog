import React, { Component } from 'react';
import WorkSearchLogService from '../services/WorkSearchLogService';

class ExportWorkSearchLogComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            fromDate: '',
            toDate: ''
        }
        this.changeFromDateHandler = this.changeFromDateHandler.bind(this);
        this.changeToDateHandler = this.changeToDateHandler.bind(this);
        this.exportToCsv = this.exportToCsv.bind(this);
    }

    componentDidMount() {
    }

    exportToCsv = (e) => {
        e.preventDefault();

        WorkSearchLogService.exportWorkSearchLog(this.state.id, this.state.fromDate, this.state.toDate).then( res => {
            this.props.history.push('/users');
        });
    }
    
    changeFromDateHandler= (event) => {
        this.setState({fromDate: event.target.value});
    }

    changeToDateHandler= (event) => {
        this.setState({toDate: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> From Date: </label>
                                            <input placeholder="yyyy-mm-dd" name="fromDate" className="form-control" 
                                                value={this.state.fromDate} onChange={this.changeFromDateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> To Date: </label>
                                            <input placeholder="yyyy-mm-dd" name="toDate" className="form-control" 
                                                value={this.state.toDate} onChange={this.changeToDateHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.exportToCsv}>Export</button>
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

export default ExportWorkSearchLogComponent
