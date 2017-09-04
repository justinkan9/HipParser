import React, { Component } from 'react';
import _ from 'lodash';
import JSONPretty from 'react-json-pretty';
import 'isomorphic-fetch';
import './App.css';

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

class MainParserContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parse: false,
			inputText: "",
			outputJson: {
				mentions: [],
				emoticons: [],
				links: []
			}
		}
		this.textOnChange = this.textOnChange.bind(this);
		this.submitForParsing = this.submitForParsing.bind(this);
		this.getTitle = this.getTitle.bind(this);
		this.addLinkData = this.addLinkData.bind(this);
	}

	getTitle(url) {
		var self = this;
		fetch("https://cors-anywhere.herokuapp.com/" + url, {
			method: "GET"
		})
		.then(function(response) {
			if(response.status >= 200 && response.status < 300) {
				return response.text();
			} else {
				return;
			}
		})
		.then(function(body) {
			var parsedResponse = (new window.DOMParser()).parseFromString(body, "text/html");
			self.addLinkData(url, _.get(parsedResponse, "title", ""));
		})
	}

	addLinkData(url, title) {
		var outputJson = this.state.outputJson;
		const link = {
			url,
			title
		}
		outputJson.links.push(link);
		this.setState({
			outputJson
		})
	}

	textOnChange(event) {
		if(event.keyCode === 13) {
			this.submitForParsing();
		} else {
			this.setState({
				inputText: event.target.value
			})
		}
	}

	submitForParsing() {
		const str = this.state.inputText;

		const mentionPattern = /@[a-z0-9_-]+/gi;
		var mentionHits = str.match(mentionPattern);
		if(mentionHits) {
			mentionHits = mentionHits.map((item) => {
				return item.substring(1);
			});
		} else {
			mentionHits = [];
		}

		const emoticonPattern = /\(([a-z0-9]{1,15})\)/gi;
		var emoticonHits = str.match(emoticonPattern);
		if(emoticonHits) {
			emoticonHits = emoticonHits.map((item) => {
				return item.substring(1, item.length - 1);
			});
		} else {
			emoticonHits = [];
		}

		const linkPattern = /((http[s]?):\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
		var linkHits = str.match(linkPattern);
		if(linkHits) {
			linkHits.map((item) => {
				this.getTitle(item);
				return item;
            });
        }

		var outputJson = this.state.outputJson;
		_.set(outputJson, "mentions", mentionHits);
		_.set(outputJson, "emoticons", emoticonHits);
		_.set(outputJson, "links", []);

		this.setState({
			parse: true,
			outputJson
		});
	}

	render() {
		const parsedOutputContainerClass = "parsed-output-container" +
			(!this.state.parse ? " hidden" : "");

		return (
            <div className="main-content">
                <input type="text"
                        className="user-input-textfield"
                        placeholder="Input string  e.g. Hello @justinkang (wave)!  Hit <return> to parse"
						onKeyUp={this.textOnChange}
                        />
				<button className="submit-button"
						onClick={this.submitForParsing}
						>
					Parse
				</button>
                <div className={parsedOutputContainerClass}>
                	<label className="parsed-output-label">
                	    Parsed Output
                	</label>

					<div className="identity-string">
						<JSONPretty id="json-pretty"
								json={this.state.outputJson}/>
                	</div>
                </div>
            </div>
		);
	}
}

export default App;
