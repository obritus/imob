import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Box = styled.div`
	display: grid;
	width: 100%;
	height: 200px;
	background: #CCC;
	background-image: ${props => "url('" + process.env.REACT_APP_BACKEND_URL + props._id + "/" + props.image + "')" || "none"};
	background-size: cover;
	background-position: 50% 50%;
	grid-template-rows: auto 20px 40px 35px;
	align-items: flex-end;
`
const Item = styled.div`
`
const Type = styled.div`
	font-size: .8em;
	text-align: center;
	width: 100px;
	background-color: #333;
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
	'2': 'Venda'
}
const GetBRL = n => {
	const options = {
		style: 'currency',
		currency: 'BRL',
		minimumIntegerDigits: 2
	}
	return new Intl.NumberFormat('pt-BR', options).format(n)
}

export default props =>
	<Link to={`/empreendimentos/${props._id}`} className="card-link">
		<Box image={props.default_image}>
			<Item></Item>
			<Type className="bg-light text-dark">{Types[props.type]}</Type>
			<Price className="bg-warning text-dark">{GetBRL(props.price)}</Price>
			<Title><p className="text-center p-2 m-0">{props.title}</p></Title>
		</Box>
	</Link>