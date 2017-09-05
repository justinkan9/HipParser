import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import MainParserContent from '../MainParserContent';

describe('<MainParserContent/>', () => {
	it('renders without crashing', () => {
	    const div = document.createElement('div');
	    ReactDOM.render(<MainParserContent/>, div);
	});
	
	it('should have a main-content div', () => {
		const wrapper = shallow(<MainParserContent/>);
		expect(wrapper.find('div.main-content')).to.have.length(1);
	});

	it('should have a user-input-textfield input', () => {
		const wrapper = shallow(<MainParserContent/>);
        expect(wrapper.find('input.user-input-textfield')).to.have.length(1);
	});

	it('should have a submit-button button', () => {
        const wrapper = shallow(<MainParserContent/>);
        expect(wrapper.find('button.submit-button')).to.have.length(1);
    });

    it('should have a div.parsed-output-container.hidden initially when parse is false', () => {
        const wrapper = shallow(<MainParserContent/>);
        expect(wrapper.find('div.parsed-output-container.hidden')).to.have.length(1);
    });

	it('should have div.parsed-output-container without hidden when parse is true', () => {
		const wrapper = shallow(<MainParserContent/>);
		wrapper.setState({
			parse: true
		});
		expect(wrapper.find('div.parsed-output-container').hasClass('hidden')).to.be.false;
	});

	it('should have output components inside container when parse is true', () => {
        const wrapper = shallow(<MainParserContent/>);
        wrapper.setState({
            parse: true,
			inputText: "hello @test",
			outputJson: {
				mentions: [ "test" ],
				emoticons: [],
				links: []
			}
        });
		expect(wrapper.find('label.parsed-output-label')).to.have.length(1);
		expect(wrapper.find('label.parsed-output-label').text()).to.equal("Parsed Output");
		expect(wrapper.find('div.identity-string')).to.have.length(1);
    });

	it('should parse mentions using parseMentions', () => {
		const wrapper = shallow(<MainParserContent/>);
        const mentions = wrapper.instance().parseMentions("@test1 @test2@test3 @justinkang");
		expect(mentions).to.deep.equal(["test1", "test2", "test3", "justinkang"]);
	});

    it('should parse emoticons using parseEmoticons', () => {
        const wrapper = shallow(<MainParserContent/>);
        const emoticons = wrapper.instance().parseEmoticons("(test)(smile) (123456789012345) (1234567890123456)");
        expect(emoticons).to.deep.equal(["test", "smile", "123456789012345"]);
    });

	it('should parse links using parseLinks', () => {
		const wrapper = shallow(<MainParserContent/>);
        const links = wrapper.instance().parseLinks("https://www.yahoo.com http://www.austrian.at https://wwwwwwwwwww");
		expect(links).to.deep.equal(["https://www.yahoo.com", "http://www.austrian.at"]);
	});

	it('should push link object using addLinkData', () => {
		const wrapper = shallow(<MainParserContent/>);
		expect(wrapper.state().outputJson.links).to.have.length(0);
		wrapper.instance().addLinkData("test_url", "test_title");
		expect(wrapper.state().outputJson.links).to.have.length(1);
	});

	it('should update inputText via textOnChange when input is changed', () => {
        const wrapper = shallow(<MainParserContent/>);
		const text = "hello @test (wave)!";
		expect(wrapper.state().inputText).to.equal("");
		wrapper.find('input.user-input-textfield').simulate('change', {
			target: {
				value: text
			}
		});
		expect(wrapper.state().inputText).to.equal(text);
	});

	it('should call submitForParsing when parse button is pressed or if return key is pressed up', () => {
		const wrapper = shallow(<MainParserContent/>);
		expect(wrapper.state().inputText).to.equal("");
		expect(wrapper.state().parse).to.be.false;
		expect(wrapper.state().outputJson).to.deep.equal({
			mentions: [],
            emoticons: [],
            links: []
		});

		var text = "hello @test (wave)!";
        wrapper.find('input.user-input-textfield').simulate('change', {
            target: {
                value: text
            }
        });

		wrapper.find('button.submit-button').simulate('click');
		expect(wrapper.state().inputText).to.equal(text);
		expect(wrapper.state().parse).to.be.true;
		expect(wrapper.state().outputJson).to.deep.equal({
            mentions: ["test"],
            emoticons: ["wave"],
            links: []
        });

		text = "hi @justinkang (smile)";
        wrapper.find('input.user-input-textfield').simulate('change', {
            target: {
                value: text
            }
        });

		wrapper.find('input.user-input-textfield').simulate('keyup', {
			keyCode: 13
		});
        expect(wrapper.state().inputText).to.equal(text);
        expect(wrapper.state().parse).to.be.true;
        expect(wrapper.state().outputJson).to.deep.equal({
            mentions: ["justinkang"],
            emoticons: ["smile"],
            links: []
        });
	});
});
