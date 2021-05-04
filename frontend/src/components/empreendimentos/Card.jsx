import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
	const thumb = id =>
		`${process.env.REACT_APP_BACKEND_URL}images/empreendimentos/${id}`
	const { _id, title, quartos, cidade, bairro, default_image } = props.data
	const GetPriceBRL = props.data.price
		.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
	return (
		<Link to={`/empreendimentos/${_id}`} className="card-link">
			<div className="card mr-3" key={_id}>
				<img src={thumb(default_image)} className="card-img-top" alt="" />
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text"><h1 className="display">{GetPriceBRL}</h1></p>
					{(quartos) ? <p className="card-text">{quartos} quartos.</p> : null}
					{(cidade && bairro) ? <p className="card-text small text-right">{cidade.name}/{bairro.name}.</p> : null}
				</div>
			</div>
		</Link>
	)
}