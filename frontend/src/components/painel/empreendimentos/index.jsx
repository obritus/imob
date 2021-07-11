import React from 'react'

export default () =>
	<div>
		<p className="m-0 fs-1">Empreendimentos</p>
		<p className="mb-3">Gerenciar todos os empreendimentos cadastrados.</p>

		<div className="btn-group mb-3" role="group">
			<a href="/painel/empreendimentos/create" className="btn btn-outline-success text-light">Adicionar novo</a>
			<a href="/painel/empreendimentos" className="btn btn-outline-primary" data-id="on">Publicados</a>
			<a href="/painel/empreendimentos?status=false" className="btn btn-outline-warning" data-id="off">Não publicados</a>
		</div>

		<table className="table table-striped table-dark table-hover table-borderless">
			<thead className="table-light">
				<tr>
					<th scope="col">Título do Anúncio</th>
					<th scope="col">Preço</th>
					<th scope="col">Categoria</th>
					<th scope="col">Tipo</th>
					<th scope="col">Cidade</th>
					<th scope="col">Bairro</th>
					<th scope="col">Excluir</th>
				</tr>
			</thead>
			<tbody className="d-none"></tbody>
		</table>

		<div className="d-flex justify-content-center spinner">
			<div className="spinner-border text-light m-5" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>

		<div className="btn-toolbar" role="toolbar">
			<div className="btn-group me-2" role="group" data-id="paginate"></div>
		</div>
	</div>