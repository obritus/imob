import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
import Product from '../Product'
import api from '../../api'

export default class Section extends Component {
	constructor(props) {
		super(props)

		this.state = {
			numberOfProducts: 50,
			products: [],
			isLoading: false
		}
	}
	componentWillMount = async () => {
		this.setState({ isLoading: true})
		await api.getAllProducts().then(products => {
			this.setState({
				products: products.data,
				isLoading: false
			})
		})
	}
	render() {
		const {products, isLoading} = this.state
		return (
			<section className="pt-3">
				<Container>
					<h1 className="pb-3">Nossos produtos</h1>
					<div data-id="produtos">
						{isLoading
							? <Spinner style={{ width: '3rem', height: '3rem' }} />
							: products.map(data =>
								<Product data={data}/>
							)
						}
					</div>
				</Container>
			</section>
		)
	}
}