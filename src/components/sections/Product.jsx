import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
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
					{isLoading
						? <Spinner style={{ width: '3rem', height: '3rem' }} />
						: <Product data={product} single />
					}
				</Container>
			</section>
		)
	}
}