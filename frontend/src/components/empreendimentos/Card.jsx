import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
	const thumb = id => `/images/${id}.jpg`
	if(props.single) {
		
	} else {
		return(
			<Link to={`/empreendimentos/${props.data._id}`} className="card-link">
				<div className="card mr-3" key={props.data._id}>
					<img src={thumb(props.data._id + '@0,25x')} className="card-img-top" alt="" />
					<div className="card-body">
						<h5 className="card-title">{props.data.title}</h5>
						<p className="card-text"><h1 className="display">R$ {props.data.price}</h1></p>
						<p className="card-text">{props.data.quartos} quartos.</p>
					</div>
				</div>
			</Link>
		)
	}
}