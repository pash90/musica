/** Libraries */
import React from 'react';
import { Container, Row, Col, Hidden, Visible } from 'react-grid-system';
import { Link } from 'react-router-dom';

/** Assets */
import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';

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

						<Col xs={6} className="item flex end">
							<Hidden xs>
								<ul className="flex menu">
									<li>Search</li>
									<li>Contact</li>
									<li>Twitter</li>
									<li>Instagram</li>
								</ul>
							</Hidden>

							<Visible xs>
								<div
									className="menu-icon flex center"
									onClick={this.props.onMenuClick}>
									<img src={menu} alt="menu-icon" />
								</div>
							</Visible>

							<Visible xs>
								<div
									className={`mobile-menu ${
										this.props.showMenu ? 'show' : ''
									}`}>
									<ul
										className="flex col menu"
										onClick={this.props.onMenuClick}>
										<li>
											<Link to="/">Search</Link>
										</li>
										<li>Contact</li>
										<li>Twitter</li>
										<li>Instagram</li>
									</ul>
								</div>
							</Visible>
						</Col>
					</Row>
				</Container>
			</header>
		);
	}
}

export default Header;
