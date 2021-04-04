import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import MainMenu from './MainMenu'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			MenuItens: [
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
					to: '/empreendimentos',
					name: 'Empreendimentos',
					title: 'Nossos empreendimentos'
				},
				{
					to: '/contact',
					name: 'Contato',
					title: 'Entre em contato com a gente'
				}
			],
			isLoading: false
		}
	}
	render() {
		return (
			<header className="pt-5 pb-5">
				<Container>
					<div>
						<Link to="/">
							<h1 data-js="logotipo">
								<span>Imobiliária X</span>
							</h1>
						</Link>
					</div>
					<div>
						<MainMenu itens={this.state.MenuItens} className="d-none d-sm-block" />
						<div id="hamburger" className="hamburger d-sm-none toggle">
							<button
								onClick={() => document.getElementById('hamburger').classList.toggle('toggle')}
								className="btn btn-dark"></button>
							<MainMenu itens={this.state.MenuItens} />
						</div>
					</div>
				</Container>
			</header>
		)
	}
}