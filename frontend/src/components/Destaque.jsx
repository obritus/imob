import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Box = styled.div`
	display: grid;
	width: 100%;
	height: 240px;
	grid-template-rows: auto 40px 35px;
	align-items: flex-end;
`
const Thumb = ({ _id, default_image }) =>
	(default_image) ? `${_id}/${default_image.filename}` : 'default_image.jpg'

const ImageHeader = styled.div`
	display: flex;
	background: #CCC;
	background-image:
		${props => "url('" + process.env.REACT_APP_BACKEND_URL + "images/empreendimentos/" + props.src + "')"};
	background-size: cover;
`
const Price = styled.div`
	text-align: center;
	font-size: 1.7em;
	font-weight: 700;
	background-color: #e47f37;
`
const Title = styled.div`
	font-size: .8em;
	color: #000;
	background: #FFF;
`
const Types = {
	'1': 'Aluguel',
	'2': 'Venda',
	'undefined': ''
}

const GetBRL = n => {
	const options = {
		style: 'currency',
		currency: 'BRL',
		minimumIntegerDigits: 2
	}
	return new Intl.NumberFormat('pt-BR', options).format(n)
}

export default ({ data }) =>
	<Link to={`/empreendimentos/${data._id}`} className="card-link">
		<Box>
			<ImageHeader className="ratio ratio-16x9" src={Thumb({ _id: data._id, default_image: data.default_image })}>
				<div className="d-flex flex-row align-items-end">
					<span className="badge rounded-pill bg-info text-dark ms-2 mb-2">{Types[data.type]}</span>
					<span className="badge rounded-pill bg-light text-dark ms-2 mb-2">{data.cidade.name}</span>
					<span className="badge rounded-pill bg-light text-dark ms-2 mb-2">{data.bairro.name}</span>
				</div>
			</ImageHeader>
			<Price className="bg-warning text-dark">{GetBRL(data.price)}</Price>
			<Title><p className="text-center p-2 m-0">{data.title}</p></Title>
		</Box>
	</Link>