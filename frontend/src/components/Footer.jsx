import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ImobJSLogo from '../images/imobjs_logo.svg'
import InstagramLogo from '../images/instagram.svg'
import FacebookLogo from '../images/facebook.svg'
import Styled from 'styled-components'

const FooterLogo = Styled.div`
	background: url(${ImobJSLogo}) no-repeat;
	width: 60px;
	height: 32px;
	float: right;
	@media (max-width: 576px) {
		float: none;
		margin: 0 auto 25px auto;
	}
`
const Instagram = Styled.div`
	background: url(${InstagramLogo}) no-repeat 50% 50%;
	width: 32px;
	height: 32px;
`
const Facebook = Styled.div`
	background: url(${FacebookLogo}) no-repeat 50% 50%;
	width: 32px;
	height: 32px;
`

export default () =>
	<footer className="mt-auto">
		<Container className="pt-3 bg-secondary" fluid>
			<Container>
				<Row>
					<Col md={4}>
						<Row className="pt-3 pt-sm-0" data-js="contact">
							<Col className="d-flex justify-content-start">
								<a href="#" target="_blank"><Instagram className="me-3" /></a>
								<a href="#" target="_blank"><Facebook /></a>
							</Col>
							<Col>
								<p className="m-0 p-0">+55 73 <strong>9 0000 0000</strong></p>
								<p>+55 73 <strong>9 0000 0000</strong></p>
							</Col>
						</Row>
					</Col>
					<Col md={4}>
						<p className="text-center pt-2">&copy; {(new Date().getFullYear())}. Todos os direitos reservados.</p>
					</Col>
					<Col md={4}>
						<FooterLogo />
					</Col>
				</Row>
			</Container>
		</Container>
	</footer>