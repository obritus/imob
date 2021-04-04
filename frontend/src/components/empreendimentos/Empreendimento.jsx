import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
import Empreendimento from './Empreendimento'
import api from '../../api'

export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			numberOfEmpreendimentos: 50,
			empreendimento: [],
			isLoading: false
		}
	}
	componentWillMount = async () => {
		this.setState({ isLoading: true})
		await api.GetEmpreendimento(this.props.data.id).then(Empreendimento => {
			this.setState({
				Empreendimento: Empreendimento.data,
				isLoading: false
			})
		})
	}
	render() {
		const {empreendimento, isLoading} = this.state
		return (
			<section className="pt-3">
				<Container>
					{isLoading
						? <Spinner style={{ width: '3rem', height: '3rem' }} />
						: <Empreendimento data={empreendimento} single />
					}
				</Container>
			</section>
		)
	}
}