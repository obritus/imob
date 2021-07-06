import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Thumb = ({ _id, default_image }) =>
	(default_image) ? `${_id}/${default_image.filename}` : 'default_image.jpg'

const BannerFull = styled.div`
	background: #CCC;
	background-image:
		${props => "url('" + process.env.REACT_APP_BACKEND_URL + "images/empreendimentos/" + props.src + "')"};
	background-size: cover;
	background-position: 50% 50%;
	height: 500px;
	margin-top: -50px;
	display: grid;
	grid-template-rows: auto 80px;
	align-items: stretch;
	div#search {
		background: rgba(0,0,0,0.5);
	}
	@media (max-width: 575px) {
		grid-template-rows: auto auto;
	}
`
const DetalhesDiv = styled.div``

const Tipos = t => {
	const values = {
		'1': 'Aluguel',
		'2': 'Venda',
		'undefined': ''
	}
	return values[t]
}
const GetBRL = n => {
	const options = {
		style: 'currency',
		currency: 'BRL',
		minimumIntegerDigits: 2
	}
	return new Intl.NumberFormat('pt-BR', options).format(n)
}
export default ({children, db}) =>
	<BannerFull className="container p-0" src={Thumb({ _id: db._id, default_image: db.default_image })}>
		<DetalhesDiv className="d-flex flex-row align-items-end" title={db.title}>
			<Link to={`/empreendimentos/${db._id}`} title={``}>
				<h5 className="bg-light text-dark p-3 mb-3 ms-3">{db.title}</h5>
			</Link>
			<h5 className="bg-success p-3 mb-3">{Tipos(db.type)}</h5>
			<h5 className="bg-warning text-dark p-3 mb-3">{GetBRL(db.price)}</h5>
		</DetalhesDiv>
		{children}
	</BannerFull>
	