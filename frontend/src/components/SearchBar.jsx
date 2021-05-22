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
		this._asyncRequest = api.GetCidades()
			.then(cidades => {
				this._asyncRequest = null
				this.setState({ cidades: cidades.data })
			})
			.catch(err => console.error(err))
		
		// OBTER OS BAIRROS QUANDO SELECIONAR NA LISTA
		document.getElementById('cidadeForm')
			.addEventListener('change', event => {
				const _id = event.target.value
				api.GetBairro(_id)
					.then(bairros => {
						this.setState({ bairros: bairros.data })
					})
			})
	}

	render() {
		const { cidades, bairros } = this.state
		return (
			<div className="pt-3" id="search">
				<Container>
					<form method="get" action="/empreendimentos">
						<div className="row">
							<div className="col-sm pb-3">
								<div className="btn-group btn-group-lg">
									<input type="radio" className="btn-check" name="type" id="aluguelButton" value="1" autoComplete="off" />
									<label className="btn btn-outline-warning" htmlFor="aluguelButton">Aluguel</label>

									<input type="radio" className="btn-check" name="type" id="vendaButton" value="2" autoComplete="off" />
									<label className="btn btn-outline-warning" htmlFor="vendaButton">Venda</label>
								</div>
							</div>
							<div className="col-sm pb-3">
								<select className="form-select form-select-lg" name="cidade" id="cidadeForm">
									<option value="">Cidade</option>
								{(
									cidades.length > 0
									? cidades.map((cidade, index) => ( <option key={index} value={cidade._id}>{cidade.name}</option> ))
									: <option>Carregando cidades</option>
								)}
								</select>
							</div>
							<div className="col-sm pb-3">
								<select className="form-select form-select-lg" name="bairro">
									<option value="">Bairro</option>
									{(
										bairros.length > 0
											? bairros.map((bairro, index) => (<option key={index} value={bairro._id}>{bairro.name}</option>))
											: <option>Carregando bairros</option>
									)}
								</select>
							</div>
							<div className="col-sm pb-3">
								<select className="form-select form-select-lg" name="categoria">
									<option value="">Categoria</option>
									<option value="1">Casa</option>
									<option value="2">Apartamento</option>
									<option value="3">Kitnet</option>
									<option value="4">Terreno</option>
									<option value="5">Lote</option>
									<option value="6">Ponto Comercial</option>
								</select>
							</div>
							<div className="col-sm pb-3">
								<input type="number"
									className="form-control form-control-lg"
									placeholder="Quartos"
									aria-label="Quartos" min="1" max="7"
									name="quartos"
								/>
							</div>
							<div className="col-sm d-grid pb-3">
								<button className="btn btn-warning btn-lg">Buscar</button>
							</div>
						</div>
					</form>
				</Container>
			</div>
		)
	}
}