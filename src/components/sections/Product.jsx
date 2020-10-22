import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Product from '../Product'
import api from '../../api'

export default class Section extends Component {
	constructor(props) {
		super(props)

		this.state = {
			numberOfProducts: 50,
			product: [],
			isLoading: false
		}
	}
	componentWillMount = async () => {
		this.setState({ isLoading: true})
		await api.getProduct(this.props.data.id).then(product => {
			this.setState({
				product: product.data,
				isLoading: false
			})
		})
	}
	render() {
		const {product, isLoading} = this.state
		return (
			<section className="pt-3">
				<Container>
					<h1>//PRODUCT_NAME</h1>
					{isLoading
						? <h2 className="display">Carregando...</h2>
						: <Product data={product} />
					}
				</Container>
			</section>
		)
	}
}