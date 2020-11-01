import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

export default props => {
	const thumb = id => `/images/${id}.jpg`
	if(props.single) {
		return(
			<Row>
				<Col md={4} className="text-right">
					<h1>{props.data.name}</h1>
					<p>R$ {props.data.price}</p>
					<p>{props.data.details}</p>
				</Col>
				<Col>
					<img src={thumb(props.data._id)} className="card-img-top" alt="" />
					<Button>Comprar</Button>
				</Col>
			</Row>
		)
	} else {
		return(
			<div className="card mr-3" key={props.data._id}>
				<img src={thumb(props.data._id + '@0,25x')} className="card-img-top" alt="" />
				<div className="card-body">
					<h5 className="card-title">{props.data.name}</h5>
					<p className="card-text"><h1 className="display">R$ {props.data.price}</h1></p>
					<p className="card-text">{props.data.details}</p>
					<Link to={`/produtos/${props.data._id}`} className="card-link">Ver detalhes</Link>
				</div>
			</div>
		)
	}
}