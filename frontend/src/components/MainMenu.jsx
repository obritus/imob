import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'reactstrap'

export default props => 
	<Nav className="" id="">
	{props.itens.map(({to, title, name}, index) =>
		<Link key={index} to={to} title={title} className="nav-link">{name}</Link>
	)}
	</Nav>