import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
	height: 360px;
`
const ImageHeader = styled.div`
	display: flex;
	background: url(${props => props.src}) no-repeat 50% 50%;
	background-size: cover;
`
const Type = {
	"1": "Aluguel",
	"2": "Venda"
}

export default props => {
	const { _id, title, price, quartos, cidade, bairro, default_image, type } = props.data
	const thumb = () => {
		if(default_image) {
			return `${process.env.REACT_APP_BACKEND_URL}images/empreendimentos/${_id}/${default_image.filename}`
		} else {
			return `/images/empreendimentos/default_image.jpg`
		}
	}
	const GetPriceBRL = price
		.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

	return (
		<Link to={`/empreendimentos/${_id}`}>
			<Card className="card border-0" key={_id}>
				<ImageHeader className="ratio ratio-16x9" src={thumb()}>
					<div className="d-flex flex-row align-items-end">
						<span className="badge rounded-pill bg-info text-dark ms-2 mb-2">{Type[type]}</span>
					</div>
				</ImageHeader>
				<div className="card-body">
					<h5 className="card-title m-0 p-0">{title}</h5>
					<h3 className="display my-2 p-0">{GetPriceBRL}</h3>
					{(quartos) ? <p className="card-text m-0 p-0">{quartos} quartos</p> : null}
				</div>
				<div className="card-footer">
					{(cidade && bairro) ? <p className="card-text small m-0 p-0">{cidade.name}/{bairro.name}.</p> : null}
				</div>
			</Card>
		</Link>
	)
}