import React from 'react'
import { Container, Nav } from 'reactstrap'
import { Link } from 'react-router-dom'
import MainMenu from './MainMenu'

const itens = [
	{
		to: '/',
		name: 'Home',
		title: 'Página inicial'
	},
	{
		to: '/sobre',
		name: 'Sobre',
		title: 'Sobre a gente'
	},
	{
		to: '/produtos',
		name: 'Produtos',
		title: 'Nossos produtos'
	},
	{
		to: '/contact',
		name: 'Contato',
		title: 'Entre em contato com a gente'
	}
]

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	toggleHamburger() {
		
	}
	render() {
		return (
			<header className="pt-5 pb-5">
				<Container>
					<div>
						<Link to="/">
							<h1 data-js="logotipo">Lojs</h1>
						</Link>
					</div>
					<div>
						<MainMenu itens={itens} className="d-none d-sm-block" />
						<div id="hamburger" className="hamburger d-sm-none toggle">
							<button
								onClick={() => this.toggleHamburger()}
								className="btn btn-dark"></button>
							<MainMenu itens={itens} />
						</div>
					</div>
				</Container>
			</header>
		)
	}
}