import React from "react"
import Styled from 'styled-components'

const ImageBox = Styled.div`
	height: 100px;
	background: #CCC url('${process.env.REACT_APP_BACKEND_URL}images/empreendimentos/${props => props.img}');
	background-size: cover;
`
export default props => {
	const {
		_id,
		title,
		price,
		details,
		bairro,
		banheiros,
		categoria,
		cidade,
		condominio,
		createdAt,
		quartos,
		suites,
		type,
		vagas_garagem } = props.data
	
	console.log("Props Images:", props.images)

	const toBRL = data => data.
		toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

	const GetType = type => {
		const tipo = {
			"1": "Aluguel",
			"2": "Venda"
		}
		return tipo[type]
	}

	const GetCategoria = c => {
		const categoria = {
			"1": "Casa",
			"2": "Apartamento",
			"3": "Terreno",
			"4": "Lote"
		}
		return categoria[c]
	}

	return (
		<div className="p-md-5 p-3" data-js="card-empreendimento">
			<h1 className="pb-3">{title}</h1>
			<div data-js="details" className="pb-5">{details}</div>
			<div data-js="info">
				<ul>
					<li><strong>preço:</strong> {toBRL(price)}</li>
					{(condominio) ? <li><strong>condomínio:</strong> {toBRL(condominio)}</li> : null}
					<li><strong>categoria:</strong> {GetCategoria(categoria)}</li>
					<li><strong>tipo:</strong> {GetType(type)}</li>
					<li><strong>quartos:</strong> {quartos}</li>
					<li><strong>suítes:</strong> {suites}</li>
					<li><strong>banheiros:</strong> {banheiros}</li>
					<li><strong>vagas na garagem:</strong> {vagas_garagem}</li>
					<li><strong>cidade:</strong> {cidade.name}</li>
					<li><strong>bairro:</strong> {bairro.name}</li>
				</ul>
			</div>
		</div>
	)
}