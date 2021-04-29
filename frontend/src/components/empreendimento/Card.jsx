import React, { Component } from "react"

export default props => {
	const { title, price, details, bairro, banheiros, categoria, cidade, createdAt, quartos, suites, type, vagas_garagem } = props.data
	return(
		<h1>{title}</h1>
	)
}