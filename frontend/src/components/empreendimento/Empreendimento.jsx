import React, { Component } from 'react'
import { Col, Row, Container } from 'reactstrap'
import api from '../../api'
import Card from './Card'
import { PhotoSwipeGallery } from 'react-photoswipe'
import 'react-photoswipe/lib/photoswipe.css'


export default class extends Component {
	constructor(props) {
		super(props)

		this.state = {
			empreendimento: [],
			galeria: []
		}
	}

	componentWillMount = () => {
		const _id = this.props.data.match.params.id
		this._asyncRequest = api.GetEmpreendimento(_id).then(
			empreendimento => {
				this._asyncRequest = null
				this.setState({ empreendimento: empreendimento.data })
			}
		)
			.then(
				this._asyncRequest = api.GetImages(_id).then(images => {
					this._asyncRequest = null
					this.setState({
						galeria: images.data.map(i => {
							const backend = process.env.REACT_APP_BACKEND_URL
							return {
								src: `${backend}images/empreendimentos/${_id}/${i.filename}`,
								thumbnail: `${backend}images/empreendimentos/${_id}/${i.filename}`,
								w: i.width,
								h: i.height
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
		const { empreendimento, galeria } = this.state
		return (
			<section className="pt-4">
				<Container className="bg-light">
					<Row>
						<Col sm={7} xl={8} data-js="dados">
							{(Object.keys(empreendimento).length > 0)
								? <Card data={empreendimento} />
								: <p className="lead">Carregando empreendimento...</p>
							}
						</Col>
						<Col sm={5} xl={4} className="d-flex py-3" data-js="galeria">
							<PhotoSwipeGallery items={galeria} thumbnailContent={(item) => {
								return (
									<img src={item.thumbnail} width={320} className="img-fluid"/>
								)
							}} />
						</Col>
					</Row>
				</Container>
				<Container fluid={true} className="p-0 m-0 mt-4" style={{height: '320px'}}>
					{(Object.keys(empreendimento).length > 0)
						? <iframe
							src={`https://www.google.com/maps?q=${empreendimento.google_maps.replace(/\s/g, '+')}&output=embed`}
							width="100%"
							height="320px"
							frameBorder="0"
							stylecss="border:0;margin-top:7px"
							allowFullScreen>
						</iframe>
						: <p className="lead">Carregando...</p>
					}
				</Container>
			</section>
		)
	}
}