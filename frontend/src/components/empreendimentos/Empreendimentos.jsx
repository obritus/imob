import React, { Component } from 'react'
import { Container, Spinner, Row, Col } from 'reactstrap'
import Product from './Product'
import api from '../../api'

export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimentos: [],
			isLoading: false
		}
	}
	componentWillMount = async () => {
		this.setState({ isLoading: true })
		await api.GetEmpreendimentos().then(empreendimentos => {
			this.setState({
				empreendimentos: empreendimentos.data,
				isLoading: false
			})
		})
	}
	render() {
		const {empreendimentos, isLoading} = this.state
		return (
			<section className="pt-3">
				<Container>
					<h1 className="pb-3">Empreendimentos</h1>
					<Row data-id="produtos">
						
						{isLoading
							? <Spinner style={{ width: '3rem', height: '3rem' }} />
							: empreendimentos.map(data =>
								<Col className="mb-3" xs={12} md={4}>
									<Product data={data} />
								</Col>)
						}
					</Row>
				</Container>
			</section>
		)
	}
}