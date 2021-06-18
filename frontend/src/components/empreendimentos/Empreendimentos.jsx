import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import queryString from 'query-string'
import SideSearchBar from '../SideSearchBar'
import Card from './Card'
import api from '../../api'

const Msg = props =>
	<div class="alert d-flex">
		<h2 class="m-0 p-0">{props}</h2>
	</div>

export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimentos: [],
			msg: null
		}
	}

	render() {
		const { empreendimentos } = this.state
		return (
			<section className="pt-3">
				<Container>
					<h1 className="pb-3">Empreendimentos</h1>
					<Row>
						<Col sm={3} className="bg-light">
							<SideSearchBar />
						</Col>
						<Col sm={9} id="empreendimentos_lista">
							{(this.state.msg) ? Msg(this.state.msg) : null}
							{empreendimentos.length > 0
								? empreendimentos.map(data => <Card data={data} />)
								: null
							}
						</Col>
					</Row>
					<nav className="py-3">
						<ul className="pagination justify-content-center">
							<li className="page-item disabled">
								<a className="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
							</li>
							<li className="page-item"><a className="page-link" href="?page=1">1</a></li>
							<li className="page-item"><a className="page-link" href="?page=2">2</a></li>
							<li className="page-item"><a className="page-link" href="?page=3">3</a></li>
							<li className="page-item">
								<a className="page-link" href="#">Próxima</a>
							</li>
						</ul>
					</nav>
				</Container>
			</section>
		)
	}

	componentDidMount = () => {
		const query = queryString.parse(this.props.location.search)
		this._asyncRequest = api.GetEmpreendimentos(document.location.search)
			.then(
				empreendimentos => {
					this._asyncRequest = null
					if (empreendimentos.data.data.length > 0) {
						this.setState({ empreendimentos: empreendimentos.data.data })
					} else {
						this.setState({ msg: 'Sua busca não retornou resultados.' })
					}
				}
			).catch(err => {
				console.error(err)
			})
	}
}