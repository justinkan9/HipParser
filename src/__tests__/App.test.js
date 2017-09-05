import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import App from '../App';

describe('<App/>', () => {
	it('renders without crashing', () => {
	    const div = document.createElement('div');
	    ReactDOM.render(<App/>, div);
	});
	
	it('should have a primary-container div', () => {
		const wrapper = shallow(<App/>);
	    expect(wrapper.find('div.primary-container')).to.have.length(1);
	});
	
	it('should have a HeadBanner component', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('HeaderBanner')).to.have.length(1);
	});
	
	it('should have a MainParserContent component', () => {
	    const wrapper = shallow(<App/>);
	    expect(wrapper.find('MainParserContent')).to.have.length(1);
	});
});
