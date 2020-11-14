import React from 'react'
import { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			teste: 'teste'
		}
	}
	sendMessage() {
		fetch('http://localhost:4000/api/messages/send', {
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
		return(
			<section className="pt-3">
				<Container>
					<h1>Contato</h1>
					<Row>
						<Col xs={12} sm={6}>
							<form method="get" action="#" onSubmit={() => this.sendMessage()}>
								<div className="form-group">
									<label htmlFor="name">Nome</label>
									<input id="name" className="form-control" type="text" name="name" />
								</div>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input id="email" className="form-control" type="email" name="email" />
								</div>
								<div className="form-group">
									<label htmlFor="message">Mensagem</label>
									<textarea
										name="message"
										id="message"
										className="form-control"
										rows="5"
									></textarea>
								</div>
								<button className="btn btn-primary text-right">Enviar</button>
							</form>
						</Col>
						<Col xs={12} sm={6}>
							<h3>Onde encontrar?</h3>
						</Col>
					</Row>
				</Container>
			</section>
		)
	}
}
