import React from 'react'
import { Link } from 'react-router-dom'

export default () =>
	<div className="d-flex flex-wrap">
		<div className="card me-3 mb-3">
			<Link to="/painel/empreendimentos" className="card-link text-dark">
				<div className="card-body text-center">
					<h4>Empreendimentos</h4>
					<h1 className="display-1 m-3">{ '3' }</h1>
					<div className="d-grid">
						<Link to="/painel/empreendimentos/create" className="btn btn-primary text-light btn-lg">Adicionar empreendimento</Link>
					</div>
				</div>
			</Link>
		</div>
		<div className="card me-3 mb-3">
			<div className="card-body text-center">
				<h4>Empreendimentos Publicados</h4>
				<h1 className="display-1 m-0">{ '4' }</h1>
			</div>
		</div>
		<div className="card me-3 mb-3">
			<div className="card-body text-center">
				<h4>Cidades</h4>
				<h1 className="display-1 m-3">{ '6' }</h1>
				<div className="d-grid">
					<Link to="/painel/cidades" className="btn btn-primary text-light btn-lg">Ver</Link>
				</div>
			</div>
		</div>
		<div className="card me-3 mb-3">
			<div className="card-body text-center">
				<h4>Bairros</h4>
				<h1 className="display-1 m-0">{ '150' }</h1>
			</div>
		</div>
		<div className="card me-3 mb-3">
			<div className="card-body">
				<h4>Mensagens</h4>
				<h1 className="display-1 m-0">
					<span className="text-muted">{ '1' }</span>/{ '50' }
				</h1>
			</div>
		</div>
	</div>