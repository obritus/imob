import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ImobJSLogo from '../images/imobjs_logo.svg'
import Styled from 'styled-components'

const FooterLogo = Styled.div`
	background: url(${ImobJSLogo}) no-repeat;
	width: 60px;
	height: 32px;
	float: right;
`
const FooterMap = Styled.div`
	height: 531px;
	background: #716A76;
`
export default () =>
	<footer>
		<FooterMap />
		<Container className="pt-3 fixed-bottom bg-secondary" fluid>
			<Container>
				<Row>
					<Col xs={12} sm={3}>
						<Row>
							<Col sm={3}>
								<a href="#" target="_blank">Instagram</a>
							</Col>
							<Col sm={3}>
								<a href="#" target="_blank">Facebook</a>
							</Col>
							<Col>
								<p className="m-0 p-0">+55 73 <strong>9 0000 0000</strong></p>
								<p>+55 73 <strong>9 0000 0000</strong></p>
							</Col>
						</Row>
					</Col>
					<Col xs={12} sm={6}>
						<p className="text-center">&copy; {(new Date().getFullYear())}. Todos os direitos reservados.</p>
					</Col>
					<Col xs={12} sm={3}>
						<FooterLogo />
					</Col>
				</Row>
			</Container>
		</Container>
	</footer>