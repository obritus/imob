import React from 'react'
import { Col, Container, Row } from 'reactstrap'

export default () =>
	<section className="pt-3">
		<Container>
			<h1 className="mb-3">Contato</h1>
			<Row>
				<Col xs={12} sm={6} className="mb-5">
					<form method="get" action="#" onSubmit="">
						<div className="form-group mb-3">
							<input id="name" className="form-control" type="text" name="name" placeholder="Nome" required/>
						</div>
						<div className="form-group mb-3">
							<input id="email" className="form-control" type="email" name="email" placeholder="Email" required/>
						</div>
						<div className="form-group mb-3">
							<textarea
								name="message"
								id="message"
								className="form-control"
								rows="5"
								placeholder="Mensagem"
								required
							></textarea>
						</div>
						<button className="btn btn-secondary btn-lg">Enviar</button>
					</form>
				</Col>
				<Col xs={12} sm={6}>
					<address>
						<p className="m-0">Rua Fulano de Tal, 0000</p>
						<p className="m-0">Porto Seguro, Bahia, Brasil</p>
						<p>CEP: 45810-000</p>
					</address>
				</Col>
			</Row>
		</Container>
	</section>