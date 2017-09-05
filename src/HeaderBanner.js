import React, { Component } from 'react';

class HeaderBanner extends Component {
    render() {
        return (
            <div className="header-banner">
                <div className="title">{this.props.title}</div>
                <div className="subtitle">justinkang</div>
            </div>
        );
    }
}

export default HeaderBanner;
