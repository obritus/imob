import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api'

const Loading = () =>
	<tr>
		<td colSpan="7">
			<div className="d-flex justify-content-center spinner">
				<div className="spinner-border text-light m-2" role="status">
					<span className="visually-hidden">Carregando...</span>
				</div>
			</div>
		</td>
	</tr>

const options = {
	style: 'currency',
	currency: 'BRL',
	minimumIntegerDigits: 2
}

const Price = p => new Intl.NumberFormat('pt-BR', options).format(p)

const Categoria = c => {
	const categorias = {
		"1": "Casa",
		"2": "Apartamento",
		"3": "Terreno",
		"4": "Lote",
		"5": "Kitnet",
	}
	return categorias[c]
}

const Type = t => {
	const type = {
		"1": "Venda",
		"2": "Aluguel"
	}
	return type[t]
}

export default () => {
	const [loading, setLoading] = useState(true)
	const [empreendimentos, setEmpreendimentos] = useState([])
	const [query, setQuery] = useState(document.location.search)
	const [TotalEmpreendimentos, setTotalEmpreendimentos] = useState(0)
	const [page, setPage] = useState(0)
	
	useEffect(() => {
		api.GetEmpreendimento(query)
		.then(res => {
				setEmpreendimentos(res.data)
				setLoading(false)
			})
			.catch(error => console.error({ error }))
	})


	const Excluir = _id => {
		const id = _id
		if (window.confirm('Deseja realmente excluir esta publicação?')) {
			const opts = {
				method: 'DELETE',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ _id: id })
			}
			fetch(`${process.env.REACT_APP_BACKEND_URL}api/empreendimentos/`, opts)
				.then(response => response.json())
				.then(() => document.querySelector(`tr[data-id="${id}"]`).remove())
				.catch(err => alert(err))
		}
	}

	return (
	<div>
		<p className="m-0 fs-1">Empreendimentos</p>
		<p className="mb-3">Gerenciar todos os empreendimentos cadastrados.</p>

		<div className="btn-group mb-3" role="group">
			<Link to="empreendimentos/create" className="btn btn-outline-success text-light">Adicionar novo</Link>
				<Link to="empreendimentos" className="btn btn-outline-primary" data-id="on" onClick={() => setQuery('')}>Publicados</Link>
			<Link className="btn btn-outline-warning" data-id="off" onClick={() => setQuery('?status=false')}>Não publicados</Link>
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
			<tbody>
					{(loading) ? <Loading /> :
						empreendimentos.data.map(({ _id, title, categoria, type, cidade, bairro, price }) => 
							<tr data-id={_id} key={_id}>
								<td>
									<Link to={`empreendimentos/edit/${_id}`} title="Editar empreendimento">{title}</Link>
								</td>
								<td>{Price(price)}</td>
								<td><Link to="">{Categoria(categoria)}</Link></td>
								<td><Link to="">{Type(type)}</Link></td>
								<td><Link to="">{(cidade) ? cidade.name : ''}</Link></td>
								<td><Link to="">{(bairro) ? bairro.name : ''}</Link></td>
								<td class="text-center align-middle">
									<button type="button" class="btn-close btn-close-white erase" title="Excluir empreendimento" onClick={() => Excluir(_id)}></button>
								</td>
							</tr>
						)
					}
			</tbody>
		</table>

		<div className="btn-toolbar" role="toolbar">
			<div className="btn-group me-2" role="group" data-id="paginate"></div>
		</div>
	</div>
	)
}