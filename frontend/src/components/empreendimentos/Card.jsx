import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
	height: 360px;
`
const Type = t => {

}
export default props => {
	const { _id, title, price, quartos, cidade, bairro, default_image, type } = props.data
	const thumb = () => {
		if(default_image) {
			return `${process.env.REACT_APP_BACKEND_URL}images/empreendimentos/${_id}/${default_image.filename}`
		} else {
			return `/images/default_image.jpg`
		}
	}
	const GetPriceBRL = price
		.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

	return (
		<Link to={`/empreendimentos/${_id}`}>
			<Card className="card" key={_id}>
				<img src={thumb()} className="card-img-top" alt="" />
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