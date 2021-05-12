import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import styled from 'styled-components'

const Header = styled.header`
	> div {
		display: grid;
		grid-template-columns: 75% 25%;
		background: red;
	}
`

export default () =>
	<Header className="pt-5 pb-5">
		<Container fluid>
			<div>
				<Link to="/" key={Math.random()}>
					<h1 data-js="logotipo">
						<span>Imobiliária X</span>
					</h1>
				</Link>
			</div>
			<div>
				<Hamburger style="background: blue"/>
			</div>
		</Container>
	</Header>