import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'reactstrap'

export default class MainMenu extends Component {
	render() {
		return (
			<Nav className={this.props.className}>
			{this.props.itens.map(({to, title, name}, index) =>
				<Link key={index} to={to} title={title} className="nav-link">{name}</Link>
			)}
			</Nav>
		)
	}
}