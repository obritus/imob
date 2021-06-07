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
				<Col md={1}>
					{/* <h1 className="d-block d-sm-none">XS</h1>
					<h1 className="d-none d-sm-block d-md-none">SM</h1>
					<h1 className="d-none d-md-block d-lg-none">MD</h1>
					<h1 className="d-none d-lg-block d-xl-none">LG</h1>
					<h1 className="d-none d-xl-block d-xxl-none">XL</h1>
					<h1 className="d-none d-xxl-block">XXL</h1> */}
				</Col>
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