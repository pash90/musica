/** Libraries */
import React from 'react';
import { setConfiguration } from 'react-grid-system';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/** Components */
import Search from '../Search';
import Results from '../Results';
import Album from '../Results/Album';
import Header from '../Header';
import Footer from '../Footer';

/** Helpers */
import { searchForAlbums } from '../actions';

/** Styles */
import './index.scss';

/** Initialisation */
setConfiguration({
	gutterWidth: 16,
	containerWidths: [540, 750, 960, 960],
});

class App extends React.PureComponent {
	state = {
		isSearching: false,
		searchResults: undefined,
		searchTerm: undefined,
		showMenu: false,
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

	toggleMobileMenu = () =>
		this.setState(prevState => ({
			showMenu: !prevState.showMenu,
		}));

	render() {
		const { searchResults, isSearching, showMenu } = this.state;

		return (
			<BrowserRouter>
				<>
					<Header onMenuClick={this.toggleMobileMenu} showMenu={showMenu} />
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<main className={showMenu ? 'move-to-left' : ''}>
									<Search
										onSearchTermUpdate={this.updateSearchTerm}
										onSearchRequest={this.startSearching}
										hasResults={searchResults ? true : false}
									/>

									<Results isSearching={isSearching} results={searchResults} />
								</main>
							)}
						/>

						<Route
							exact
							path="/album/:id"
							render={props => (
								<main className={showMenu ? 'move-to-left' : ''}>
									<Search
										onSearchTermUpdate={this.updateSearchTerm}
										onSearchRequest={this.startSearching}
										hasResults={true}
									/>

									<Album {...props} />
								</main>
							)}
						/>
					</Switch>
					<Footer />
				</>
			</BrowserRouter>
		);
	}
}

export default App;
