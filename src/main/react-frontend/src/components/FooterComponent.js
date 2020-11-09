import React, { Component } from 'react';

class footerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="text-center">
                <hr />
                <span className="font-italic font-weight-light">All Rights Reserved 2020 @Percival Bragg</span>
            </div>
        );
    }
}

export default footerComponent;