import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'reactstrap'

export default props => 
	<Nav className="nav flex-column">
		{props.itens.map(({to, title, name}, index) =>
			<Link key={index} to={to} title={title} className="nav-link py-0 px-4 fs-5">{name}</Link>
		)}
	</Nav>