import React from "react"
import styled from "styled-components"

const DataBox = styled.p`
	font-size: .5em;
	color: #AAA;
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

	const toBRL = data => data.
		toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

	const GetDate = d => {
		const data = new Date(d)

		const meses = [
			'janeiro',
			'fevereiro',
			'março',
			'abril',
			'maio',
			'junho',
			'julho',
			'agosto',
			'setembro',
			'outubro',
			'novembro',
			'dezembro'
		]

		const dias = [
			'segunda-feira',
			'terça-feira',
			'quarta-feira',
			'quita-feira',
			'sexta-feira',
			'sábado',
			'domingo',
		]

		const zero = (arg) => {
			return ((arg < 10) ? '0' + arg : arg)
		}

		const diaNome = dias[data.getDay()]
		const dia = data.getDate()
		const mes = meses[data.getMonth()]
		const ano = data.getFullYear()
		const horas = zero(data.getHours()) + 'h' + zero(data.getMinutes())

		return `${diaNome}, ${dia} de ${mes} de ${ano}, às ${horas}.`
	}

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

					{(quartos) ? <li><strong>quartos:</strong> {quartos}</li> : null}
					{(suites) ? <li><strong>suítes:</strong> {suites}</li> : null}
					{(banheiros) ? <li><strong>banheiros:</strong> {banheiros}</li> : null}
					{(vagas_garagem) ? <li><strong>vagas na garagem:</strong> {vagas_garagem}</li> : null}

					<li><strong>cidade:</strong> {cidade.name}</li>
					<li><strong>bairro:</strong> {bairro.name}</li>
				</ul>
				<DataBox>Postado {GetDate(createdAt)}</DataBox>
			</div>
		</div>
	)
}