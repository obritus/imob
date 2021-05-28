import React from 'react'
import { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

export default class extends Component {
	constructor(props) {
		super(props)
	}

	sendMessage() {
		fetch(process.env.REACT_APP_BACKEND_URL + 'api/messages/send', {
			method: 'post',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({
				name: document.getElementById('name').value,
				email: document.getElementById('email').value,
				message: document.getElementById('message').value,
				read: false
			})
		}).then(response => response.json().then(data => {
			console.log(data)
		}))
	}

	render() {
		console.log("Props", this.props.data)
		return(
			<section className="pt-3">
				<Container>
					<h1 className="mb-3">Contato</h1>
					<Row>
						<Col xs={12} sm={6} className="mb-5">
							<form method="get" action="#" onSubmit={() => this.sendMessage()}>
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
		)
	}
}
