import React, { Component } from "react"
import Col from "reactstrap/lib/Col"
import Container from "reactstrap/lib/Container"
import Row from "reactstrap/lib/Row"
import Styled from 'styled-components'
import api from "../../api"

const ImageBox = Styled.div`
	height: 100px;
	background: #CCC;
`
export default class extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const {
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
			vagas_garagem } = this.props.data

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
			<Container className="bg-light p-5" data-js="card-empreendimento">
				<Row>
					<Col sm={7} xl={8} data-js="dados">
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
					</Col>
					<Col sm={5} xl={4} data-js="galeria">
						<ImageBox src="http://localhost:3001/images/empreendimentos/60875cd0d478e83e30169403/27fe4661fdbcc6ae959403877991791d.jpg" />
						<ImageBox src="http://localhost:3001/images/empreendimentos/60875cd0d478e83e30169403/665d15ce12c784206c63d5f47e44ffdd.jpg" />
						<ImageBox src="http://localhost:3001/images/empreendimentos/60875cd0d478e83e30169403/d9f0c9df62868ad85c146e5d9151a44f.jpg" />
					</Col>
				</Row>
			</Container>
		)
	}

}