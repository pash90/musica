/** Libraries */
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

/** Assets */
import search from '../assets/search.svg';

/** Styles */
import './index.scss';

/**
 * @typedef SearchProps
 * @property {(searchTerm: string) => void} onSearchTermUpdate
 * @property {(event: any) => void} onSearchRequest
 * @property {boolean} hasResults
 */

/**
 * @class Search
 * @augments React.Component<SearchProps>
 */
class Search extends React.Component {
	checkForRequest = event => {
		if (event.keyCode === 13) {
			this.props.onSearchRequest();
		}
	};

	updateSearchTerm = event => this.props.onSearchTermUpdate(event.target.value);

	render() {
		return (
			<div className="search-area">
				<Container>
					<Row>
						<Col
							xs={10}
							sm={8}
							md={6}
							offset={{ xs: 1, sm: 2, md: 3 }}
							className={`search-box flex col center ${
								this.props.hasResults ? 'reduce' : ''
							}`}>
							<h2>Search for music, games, videos and many more</h2>

							<div className="search flex between margin-top-2 padding-1">
								<input
									onChange={this.updateSearchTerm}
									onKeyDown={this.checkForRequest}
								/>
								<img src={search} alt="search-icon" />
							</div>

							<Link
								className="search-button margin-top-2"
								to="/"
								onClick={this.props.onSearchRequest}>
								Go
							</Link>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Search;
