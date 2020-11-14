import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
import api from '../api/index'

const CarouselItem = (props) => {
	return (
		<a href={props.data.url}>
			<div className="carousel-item">
				<img className="d-block w-100" src={"/images/carousel/" + props.data.image} alt={props.data.title} />
				<div className="carousel-caption d-none d-md-block">
					<h5>{props.data.title}</h5>
				</div>
			</div>
		</a>
	)
}
export default class Section extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			images: [],
			isLoading: false
		}
	}
	componentWillMount = async () => {
		this.setState({ isLoading: true })
		await api.getCarousel().then(carousel => {
			this.setState({
				images: carousel.data[0].carousel,
				isLoading: false
			})
		})
	}
	render () {
		const {images, isLoading} = this.state
		return (
			<section className="pt-3">
				<Container fluid>
					{images.status
						? <div id="my-carousel" className="carousel slide" data-ride="carousel">
								<div className="carousel-inner">
									{isLoading
										? <Spinner style={{ width: '3rem', height: '3rem' }} />
										: images.imagens
											.map(data => <CarouselItem data={data} />)
									}
								</div>
							</div>
						: null
					}
				</Container>
			</section>
		)
	}
}