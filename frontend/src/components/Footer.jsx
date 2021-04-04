import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ImobJSLogo from '../images/imobjs_logo.svg'
import Styled from 'styled-components'

const FooterLogo = Styled.div`
	background: url(${ImobJSLogo}) no-repeat;
	widht: 60px;
	height: 32px;
`
export default () =>
	<footer className="pt-3 fixed-bottom">
		<Container>
			<Row>
				<Col xs={12} sm={6}>
					<p className="text-right">&copy; {(new Date().getFullYear())}. Todos os direitos reservados.</p>
				</Col>
				<Col xs={12} sm={6}>
					<FooterLogo />
				</Col>
			</Row>
		</Container>
	</footer>