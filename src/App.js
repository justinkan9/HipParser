import React, { Component } from 'react';
import './App.css';

import HeaderBanner from './HeaderBanner';
import MainParserContent from './MainParserContent';

class App extends Component {
    render() {
        return (
            <div className="primary-container">
				<HeaderBanner title="Hip Parser"/>
				<MainParserContent/>
            </div>
        );
    }
}

export default App;
