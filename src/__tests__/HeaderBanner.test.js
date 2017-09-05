import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import HeaderBanner from '../HeaderBanner';

describe('<HeaderBanner/>', () => {
	var props;
	beforeEach(() => {
		props = {
			title: "Hip Parser"
		}
	});

	it('renders without crashing', () => {
	    const div = document.createElement('div');
	    ReactDOM.render(<HeaderBanner {...props}/>, div);
	});
	
	it('should have a header-banner div', () => {
		const wrapper = shallow(<HeaderBanner {...props}/>);
		expect(wrapper.find('div.header-banner')).to.have.length(1);
	});

	it('should have a title div', () => {
		const wrapper = shallow(<HeaderBanner {...props}/>);
        expect(wrapper.find('div.title')).to.have.length(1);
	});

	it('should have the correct title text', () => {
		const wrapper = shallow(<HeaderBanner {...props}/>);
        expect(wrapper.find('div.title').text()).to.equal("Hip Parser");
	});

	it('should have a subtitle div with justinkang as text', () => {
        const wrapper = shallow(<HeaderBanner {...props}/>);
        expect(wrapper.find('div.subtitle')).to.have.length(1);
        expect(wrapper.find('div.subtitle').text()).to.equal("justinkang");
	});
});
