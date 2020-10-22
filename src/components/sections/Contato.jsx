import React from 'react'
import { Container } from 'reactstrap'

export default () =>
	<section className="pt-3">
		<Container>
			<h1>Contato</h1>
			<form method="get" action="#" onSubmit={e => e.preventDefault}>
				<div className="form-group">
					<label htmlFor="name">Nome</label>
					<input id="name" className="form-control" type="text" name="name" />
				</div>
				
			</form>
		</Container>
	</section>