/** Libraries */
import React, { Component } from 'react';
import { setConfiguration } from 'react-grid-system';
import { BrowserRouter, Route } from 'react-router-dom';

/** Components */
import Search from '../Search';
import Results from '../Results';
import Album from '../Results/Album';

/** Helpers */
import { searchForAlbums } from '../actions';

/** Styles */
import './index.scss';

/** Initialisation */
setConfiguration({
	gutterWidth: 16,
	containerWidths: [540, 750, 960, 960],
});

class App extends Component {
	state = {
		isSearching: false,
		searchResults: undefined,
		searchTerm: undefined,
	};

	updateSearchTerm = searchTerm =>
		this.setState(prevState => ({
			searchTerm,
		}));

	startSearching = () =>
		this.setState(
			prevState => ({
				isSearching: true,
				searchResults: undefined,
			}),
			this.performSearch
		);

	performSearch = () => {
		const { searchTerm } = this.state;

		searchForAlbums(searchTerm)
			.then(response => {
				this.setState(prevState => ({
					searchResults: response.data.results,
				}));
			})
			.catch(error => {
				console.log(error);
				return Promise.reject(error);
			})
			.then(_ =>
				this.setState(prevState => ({
					isSearching: false,
				}))
			);
	};

	render() {
		const { searchResults, isSearching } = this.state;

		return (
			<BrowserRouter>
				<main>
					<Search
						onSearchTermUpdate={this.updateSearchTerm}
						onSearchRequest={this.startSearching}
					/>

					<Route
						exact
						path="/"
						render={() => (
							<Results isSearching={isSearching} results={searchResults} />
						)}
					/>
					<Route path="/album/:id" component={Album} />
				</main>
			</BrowserRouter>
		);
	}
}

export default App;
