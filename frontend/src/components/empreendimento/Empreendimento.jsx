import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Col from "reactstrap/lib/Col"
import Row from "reactstrap/lib/Row"
import api from '../../api'
import Card from './Card'
import { PhotoSwipeGallery } from 'react-photoswipe'
import 'react-photoswipe/lib/photoswipe.css'


export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimento: [],
			images: [],
			galeria: [],
			cidade: null,
			bairro: null
		}
	}

	componentWillMount = () => {
		const _id = this.props.data.match.params.id
		this._asyncRequest = api.GetEmpreendimento(_id).then(
			empreendimento => {
				console.log("Dados:", empreendimento.data)
				this._asyncRequest = null
				this.setState({ empreendimento: empreendimento.data })
			}
		)
			.then(
				this._asyncRequest = api.GetImages(_id).then(images => {
					console.log("Images:", images.data)
					this._asyncRequest = null
					this.setState({ images: images.data })
					this.setState({
						galeria: images.data.map(i => {
							const backend = process.env.REACT_APP_BACKEND_URL
							return {
								src: `${backend}images/empreendimentos/${_id}/${i.filename}`,
								thumbnail: `${backend}images/empreendimentos/${_id}/${i.filename}`,
								w: 1366,
								h: 768
							}
						})
					})
				})
			)
			.catch(err => {
				console.error(err)
			})
		
	}

	render() {
		const { empreendimento, images, galeria } = this.state
		return (
			<section className="pt-3">
				<Container className="bg-light">
					<Row>
						<Col sm={7} xl={8} data-js="dados">
							{(Object.keys(empreendimento).length > 0)
								? <Card data={empreendimento} images={images} />
								: <p className="lead">Carregando empreendimento...</p>
							}
						</Col>
						<Col sm={5} xl={4} className="d-flex" data-js="galeria">
							<PhotoSwipeGallery items={galeria} thumbnailContent={(item) => {
								return (
									<img src={item.thumbnail} width={200} className="img-fluid"/>
								)
							}} />
						</Col>
					</Row>
				</Container>
			</section>
		)
	}
}