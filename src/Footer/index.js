/** Libraries */
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<Container>
					<Row>
						<Col className="flex center" style={{ height: 48 }}>
							<p style={{ color: '#939393', fontSize: '14px' }}>
								© Copyright Musica App PTY LTD, 2019
							</p>
						</Col>
					</Row>
				</Container>
			</footer>
		);
	}
}

export default Footer;
