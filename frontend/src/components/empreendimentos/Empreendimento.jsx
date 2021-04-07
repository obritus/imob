import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
import api from '../../api'

export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimento: []
		}
	}

	componentWillMount = () => {
		console.log('Search box pronto.')
		this._asyncRequest = api.GetEmpreendimento(this.props.data.id).then(
			empreendimento => {
				this._asyncRequest = null
				this.setState({ empreendimento: empreendimento.data })
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
					<h2>Empreendimento title</h2>
					{empreendimento.length > 0
						? <h2>Teste</h2>
						: <Spinner style={{ width: '3rem', height: '3rem' }} />
					}
				</Container>
			</section>
		)
	}
}