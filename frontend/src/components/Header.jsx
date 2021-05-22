import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import styled from 'styled-components'
import logotipo from '../images/logotipo.jpeg'

const Header = styled.header`

`
const Logotipo = styled.div`
	width: 300px;
	height: 150px;
	margin: 0 auto;
	background: url('${logotipo}') 50% 50% no-repeat;
	background-clip: content-box;
	background-size: contain;
	span {
		display: none;
	}
	@media (max-width: 575px) {
		margin: 0;
		height: 90px;
		background-position-x: 5%;
	}
`
export default () =>
	<Header className="py-5">
		<Container fluid>
			<Row>
				<Col md={1}></Col>
				<Col md={10}>
					<Link to="/" key={Math.random()}>
						<Logotipo className="mb-4">
							<span>Imobiliária Brilho do Sol</span>
						</Logotipo>
					</Link>
				</Col>
				<Col md={1}>
					<Hamburger />
				</Col>
			</Row>
		</Container>
	</Header>