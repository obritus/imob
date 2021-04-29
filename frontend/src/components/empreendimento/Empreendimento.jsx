import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
import api from '../../api'
import Card from './Card'

export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimento: []
		}
	}

	componentWillMount = () => {
		this._asyncRequest = api.GetEmpreendimento(this.props.data.match.params.id).then(
			empreendimento => {
				console.log(empreendimento.data)
				this._asyncRequest = null
				this.setState({ empreendimento: empreendimento.data })
				console.log(typeof [])
			}
		).catch(err => {
			console.error(err)
		})
		
	}

	render() {
		const { empreendimento } = this.state
		return (
			<section className="pt-3">
				<Container>
					{(Object.keys(empreendimento).length > 0)
						? <Card data={empreendimento}/>
						: <p className="lead">Carregando empreendimento...</p>
					}
				</Container>
			</section>
		)
	}
}