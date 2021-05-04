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
		// OBTER AS CIDADES ASSIM QUE O SITE CARREGAR
		this._asyncRequest = api.GetCidades().then(
			cidades => {
				this._asyncRequest = null
				this.setState({ cidades: cidades.data })
			}
		).catch(err => {
			console.error(err)
		})
		
		// OBTER OS BAIRROS QUANDO SELECIONAR NA LISTA
		document.getElementById('cidadeForm')
			.addEventListener('change', event => {
				const _id = event.target.value
				api.GetBairros(_id).then(bairros => {
					this.setState({ bairros: bairros.data })
				})
		})
	}

	render() {
		const { cidades, bairros } = this.state
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
					<Container>
						<form method="get" action="/empreendimentos">
							<div className="row">
								<div className="col-sm">
									<select className="form-select" name="cidade" id="cidadeForm">
										<option value="">Cidade</option>
									{(
										cidades.length > 0
										? cidades.map((cidade, index) => ( <option key={index} value={cidade._id}>{cidade.name}</option> ))
										: <option>Carregando cidades</option>
									)}
									</select>
								</div>
								<div className="col-sm">
									<select className="form-select" name="bairro">
										<option value="">Bairro</option>
										{(
											bairros.length > 0
												? bairros.map((bairro, index) => (<option key={index} value={bairro._id}>{bairro.name}</option>))
												: <option>Carregando bairros</option>
										)}
									</select>
								</div>
								<div className="col-sm">
									<select className="form-select" name="type">
										<option value="">Tipo</option>
										<option value="1">Casa</option>
										<option value="2">Apartamento</option>
										<option value="3">Kitnet</option>
										<option value="4">Terreno</option>
										<option value="5">Lote</option>
										<option value="6">Ponto Comercial</option>
									</select>
								</div>
								<div className="col-sm">
									<input type="number"
										className="form-control"
										placeholder="Quartos"
										aria-label="Quartos" min="1" max="7"
										name="quartos"
									/>
								</div>
								<div className="col-sm d-grid">
									<button
										className="btn btn-warning"
									>Buscar</button>
								</div>
							</div>
						</form>
					</Container>
				</div>
			</>
		)
	}
}