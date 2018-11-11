/** Libraries */
import React from 'react';
import { Col } from 'react-grid-system';

/** Assets */
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';
import muted from '../assets/muted.svg';
import unmuted from '../assets/unmuted.svg';

/**
 * @typedef TrackProps
 * @property {string} name
 * @property {string} previewUrl
 * @property {number} year
 * @property {string} art
 * @property {string} artist
 */

/**
 * @class Track
 * @augments React.Component<TrackProps>
 */
class Track extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isPlayingSample: false,
			isMuted: false,
			currentTime: '00:00',
		};

		this.audioRef = React.createRef();
	}

	playSample = () => {
		this.setState(prevState => ({
			isPlayingSample: true,
		}));

		this.audioRef.current.play();
	};

	pauseSample = () => {
		this.setState(prevState => ({
			isPlayingSample: false,
		}));

		this.audioRef.current.pause();
	};

	toggleVolume = () => {
		this.audioRef.current.muted = !this.audioRef.current.muted;
		this.setState(prevState => ({
			isMuted: this.audioRef.current.muted,
		}));
	};

	updateCurrentTime = event => {
		const currentTime = Math.round(event.target.currentTime);

		this.setState(prevState => ({
			currentTime:
				currentTime < 10 ? `00:0${currentTime}` : `00:${currentTime}`,
		}));
	};

	render() {
		const { name, art, artist, year, previewUrl } = this.props;
		const { isPlayingSample, isMuted, currentTime } = this.state;

		const player = this.audioRef.current;

		return (
			<Col xs={12} sm={6} className="flex album">
				<img className="art" src={art} alt="album-cover" />
				<div className="flex col top info">
					<p className="title">{name}</p>
					<p className="artist">
						{artist} ({year})
					</p>

					<div className="margin-top-2 player flex">
						<div
							className="control flex center"
							onClick={isPlayingSample ? this.pauseSample : this.playSample}>
							<img
								src={isPlayingSample ? pause : play}
								alt="play-pause icons"
							/>
						</div>

						<div className="time-display">
							<p>
								{currentTime} /{' '}
								{player === null
									? '00:00'
									: `00:${Math.round(player.duration)}`}
							</p>
						</div>

						<div className="control flex center" onClick={this.toggleVolume}>
							<img src={isMuted ? muted : unmuted} alt="volume-toggle icons" />
						</div>

						<audio
							ref={this.audioRef}
							controls
							preload="metadata"
							style={{ display: 'none' }}
							onTimeUpdate={this.updateCurrentTime}
							onEnded={this.pauseSample}>
							<source src={previewUrl} type="audio/mp4" />
							Your browser does not support the audio element.
						</audio>
					</div>
				</div>

				<div className="bottom-border" />
			</Col>
		);
	}
}

export default Track;
