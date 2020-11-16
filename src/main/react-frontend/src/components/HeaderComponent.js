import React, { Component } from 'react';

class headerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
               <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <a href="https://www.twc.texas.gov" className="navbar-brand">Texas Workforce Commission Work Search Activity Log</a>
                        </div>
                    </nav>
                </header> 
            </div>
        );
    }
}

export default headerComponent;