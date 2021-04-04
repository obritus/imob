import React from 'react'
import { Container } from 'reactstrap'
import api from '../api/'

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cidades: [],
			bairros: []
		}
	}

	componentDidMount = () => {
		console.log('Search box pronto.')
		this._asyncRequest = api.GetCidades().then(
			cidades => {
				this._asyncRequest = null
				this.setState({ cidades: cidades.data })
			}
		).catch(err => {
			console.error(err)
		})
	}

	render() {
		const { cidades } = this.state
		return (
			<>
				<div id="carousel"></div>
				<div id="teste">
					<Container>
						<button className="btn btn-lg btn-primary">Aluguel</button>
						<button className="btn btn-lg btn-warning">Venda</button>
					</Container>
				</div>
				<div id="search">
					<Container className="pt-3">
						<form>
							<div className="row">
								<div className="col-sm">
									<select className="form-select">
									{(
										cidades.length > 0
										? cidades.map((cidade, index) => ( <option key={index} value={cidade._id}>{cidade.name}</option> ))
										: <option>Carregando cidades</option>
									)}
									</select>
								</div>
								<div className="col-sm">
									<select className="form-select">
										<option value="">Bairro</option>
									</select>
								</div>
								<div className="col-sm">
									<select className="form-select">
										<option value="">Tipo</option>
										<option value="casa">Casa</option>
										<option value="apartamento">Apartamento</option>
										<option value="kitnet">Kitnet</option>
										<option value="ponto_comercial">Ponto Comercial</option>
									</select>
								</div>
								<div className="col-sm">
									<input type="number" className="form-control" placeholder="Quartos" aria-label="Quartos" min="1" max="7" />
								</div>
								<div className="col-sm d-grid">
									<button className="btn btn-warning">Buscar</button>
								</div>
							</div>
						</form>
					</Container>
				</div>
			</>
		)
	}
}