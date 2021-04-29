import React, { Component } from 'react'
import { Container, Spinner, Row, Col } from 'reactstrap'
import Card from './Card'
import api from '../../api'

export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimentos: []
		}
	}

	componentWillMount = () => {
		this._asyncRequest = api.GetEmpreendimentos().then(
			empreendimentos => {
				this._asyncRequest = null
				this.setState({ empreendimentos: empreendimentos.data })
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
							: <Spinner style={{ width: '3rem', height: '3rem' }} />
						}
					</Row>
				</Container>
			</section>
		)
	}
}