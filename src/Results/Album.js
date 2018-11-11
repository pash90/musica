/** Libraries */
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { Container, Row } from 'react-grid-system';
import Moment from 'moment';

/** Components */
import Track from './Track';

/** Helpers */
import { searchForSongs } from '../actions';

/**
 * @typedef AlbumProps
 * @property {string} name
 * @property {number} year
 * @property {string} id
 */

/**
 * @class Album
 * @augments React.Component<AlbumProps>
 */
class Album extends React.Component {
	state = {
		isFetchingSongs: true,
		results: undefined,
	};

	componentDidMount() {
		const {
			match: {
				params: { id },
			},
		} = this.props;

		searchForSongs(id).then(response => {
			this.setState(prevState => ({
				isFetchingSongs: false,
				results: response.data.results,
			}));
		});
	}

	render() {
		const { isFetchingSongs, results } = this.state;

		if (isFetchingSongs) {
			return (
				<Container className="flex center">
					<ClipLoader loading={true} size={32} color="#09249E" />
				</Container>
			);
		}

		console.log(results);
		return (
			<Container className="album-view">
				<Row>
					{results
						.filter(result => result.wrapperType === 'track')
						.map((result, index) => (
							<Track
								key={index}
								name={result.trackName}
								previewUrl={result.previewUrl}
								art={result.artworkUrl100}
								year={Moment(result.releaseDate).year()}
								artist={result.artistName}
							/>
						))}
				</Row>
			</Container>
		);
	}
}

export default Album;
