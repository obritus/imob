import React, { Component } from 'react'
import { Container, Spinner, Col } from 'reactstrap'
import DefaultBanner from './DefaultBanner'
import Destaque from './Destaque'
import SearchBar from './SearchBar'
import api from '../api'

export default class Section extends Component {
	state = { 
		default_banner: null,
		destaques: []
	}

	render () {
		const { default_banner, destaques } = this.state
		return (
			<section>
				{default_banner
					? <DefaultBanner db={default_banner}>
						<SearchBar />
					 </DefaultBanner>
					: null
				}
				
				<Container>
					<h2 className="text-center my-4 text-dark">Destaques</h2>
					<div className="row">

						{destaques.length > 0
							? destaques.map((data) =>
								<Col className="mb-3" xs={12} sm={4}>
									<Destaque data={data} />
								</Col>)
							: null
						}

					</div>
				</Container>
			</section>
		)
	}

	componentDidMount = () => {
		this._asyncRequest = api.GetSettings()
			.then(response => {
				this._asyncRequest = null
				this.setState({
					default_banner: response.data.default_banner,
					destaques: response.data.destaques
				})
			})
			.catch(err => console.error(err))
	}
}