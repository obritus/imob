import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
import styled from 'styled-components'
import api from '../api'

import BannerImage from '../images/banner-home.jpg'
import SearchBar from './SearchBar'

const BannerFull = styled.div`
	background: #FFF url(${BannerImage}) no-repeat 50% 0;
	height: 500px;
	margin-top: -50px;
	display: grid;
	grid-template-rows: auto 75px 75px;
	div#search {
		background: rgba(0,0,0,0.6)
	}
`
const Destaque = styled.div`
	height: 200px;
	background-color: #CCC;
`
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
	state = { 
		images: []
	}

	componentDidMount = async () => {
		await api.getCarousel().then(carousel => {
			this.setState({
				images: carousel.data[0].carousel
			})
		})
	}

	render () {
		const { images } = this.state
		return (
			<section className="pt-3">
				<BannerFull className="container p-0">
					<SearchBar/>
				</BannerFull>
				<Container>
					<h2 className="text-center mt-3 mb-3">Destaques</h2>
					<div className="row">
						<div className="col-sm">
							<Destaque/>
						</div>
						<div className="col-sm">
							<Destaque/>
						</div>
						<div className="col-sm">
							<Destaque/>
						</div>
					</div>
				</Container>
				<Container fluid>
					{images.status
						? <div id="my-carousel" className="carousel slide" data-ride="carousel">
								<div className="carousel-inner">
									{images.length > 0
										? images.imagens.map(data => <CarouselItem data={data} />)
										: <Spinner style={{ width: '3rem', height: '3rem' }} />
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