/// <reference path="../types.js" />

/** Libraries */
import React from 'react';
import { Container, Row } from 'react-grid-system';
import { ClipLoader } from 'react-spinners';
import Moment from 'moment';
import { withRouter } from 'react-router-dom';

/** Components */
import Result from './Result';

/** Styles */
import './index.scss';

/**
 * @typedef ResultsProps
 * @property {boolean} isSearching
 * @property {SearchResult[]} [results]
 */

/**
 * @class Results
 * @augments React.Component<ResultsProps>
 */
class Results extends React.Component {
	render() {
		const { isSearching, results } = this.props;

		if (isSearching) {
			return (
				<Container className="flex center margin-top-4">
					<ClipLoader loading={true} size={32} color="#09249E" />
				</Container>
			);
		}

		if (!isSearching && !results) {
			return <noscript />;
		}

		return (
			<Container className="margin-top-4">
				<Row>
					{results.map((result, key) => (
						<Result
							key={key}
							name={result.collectionName}
							art={result.artworkUrl100}
							year={Moment(result.releaseDate).year()}
							id={result.collectionId}
							artist={result.artistName}
						/>
					))}
				</Row>
			</Container>
		);
	}
}

export default withRouter(Results);
