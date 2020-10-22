import React from 'react'
import { Link } from 'react-router-dom'
const thumb =  '/images/thumb-image.webp'

export default props =>
	<div className="card mr-3" key={props.data._id}>
		<img src={thumb} className="card-img-top" alt="" />
		<div className="card-body">
			<h5 className="card-title">{props.data.name}</h5>
			<p className="card-text"><h1 className="display">R$ {props.data.price}</h1></p>
			<p className="card-text">{props.data.details}</p>
			<Link to={`/produtos/${props.data._id}`} className="card-link">Ver detalhes</Link>
		</div>
	</div>