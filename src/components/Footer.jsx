import React from 'react'
import MainMenu from './MainMenu'
import { Container, Row, Col } from 'reactstrap'

const itens = [
	{
		to: '',
		name: 'Home',
		title: 'Página inicial'
	},
	{
		to: 'sobre',
		name: 'Sobre',
		title: 'Sobre a gente'
	},
	{
		to: 'produtos',
		name: 'Produtos',
		title: 'Nossos produtos'
	},
	{
		to: 'contact',
		name: 'Contato',
		title: 'Entre em contato com a gente'
	}
]

export default () =>
	<footer className="pt-3 fixed-bottom">
		<Container>
			<Row>
				<Col>
					<MainMenu itens={itens} />
				</Col>
				<Col xs={12} sm={6}>
					<p className="text-right">&copy; 2020. Todos os direitos reservados.</p>
				</Col>
			</Row>
		</Container>
	</footer>