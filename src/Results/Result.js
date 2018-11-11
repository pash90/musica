/** Libraries */
import React from 'react';
import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

/**
 * @typedef ResultProps
 * @property {string} name
 * @property {string} art
 * @property {string} artist
 * @property {number} year
 * @property {string} id
 */

/**
 * @class Result
 * @augments React.Component<ResultProps>
 */
class Result extends React.Component {
	render() {
		const { name, art, artist, year, id } = this.props;

		return (
			<Col xs={12} sm={6} className="flex album">
				<img className="art" src={art} alt="album-cover" />
				<div className="flex col top info">
					<p className="title">{name}</p>
					<p className="artist">
						{artist} ({year})
					</p>
				</div>

				<div className="bottom-border" />

				<Link to={`/album/${id}`} className="album-link" />
			</Col>
		);
	}
}

export default Result;
