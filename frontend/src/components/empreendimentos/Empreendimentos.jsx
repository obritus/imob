import React, { Component } from 'react'
import { Container, Spinner, Row, Col } from 'reactstrap'
import queryString from 'query-string'
import Card from './Card'
import api from '../../api'

export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimentos: [],
			msg: null
		}
	}

	componentWillMount = () => {
		const query = queryString.parse(this.props.location.search)
		console.log(document.location.search)
		this._asyncRequest = api.GetEmpreendimentos(document.location.search)
			.then(
				empreendimentos => {
					this._asyncRequest = null
					console.log('empreendimentos.data', empreendimentos.data)
					if(empreendimentos.data.length > 0) {
						this.setState({ empreendimentos: empreendimentos.data })
					} else {
						this.setState({ msg: 'Sua busca não retornou resultados.' })
					}
				}
			).catch(err => {
				console.error(err)
			})
	}

	render() {
		const { empreendimentos } = this.state
		return (
			<section className="pt-3">
				<Container>
					<h1 className="pb-3">Empreendimentos</h1>
					<Row data-id="produtos">
						{empreendimentos.length > 0
							? empreendimentos.map(data =>
								<Col className="mb-3" xs={12} sm={4}>
									<Card data={data} />
								</Col>)
							: <p>{this.state.msg}</p>
						}
					</Row>
				</Container>
			</section>
		)
	}
}