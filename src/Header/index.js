/** Libraries */
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

/** Assets */
import logo from '../assets/logo.svg';

/** Styles */
import './index.scss';

class Header extends React.Component {
	render() {
		return (
			<header>
				<Container fluid sm md>
					<Row>
						<Col xs={6} className="item flex">
							<img src={logo} className="logo" alt="logo" />
							<h4>Musica</h4>
						</Col>

						<Col xs={6}>menu</Col>
					</Row>
				</Container>
			</header>
		);
	}
}

export default Header;
