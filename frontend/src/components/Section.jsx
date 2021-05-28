import React, { Component } from 'react'
import { Container, Spinner, Col } from 'reactstrap'
import styled from 'styled-components'
import Destaque from './Destaque'
import BannerImage from '../images/banner-home.jpg'
import SearchBar from './SearchBar'
import api from '../api'

const BannerFull = styled.div`
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	background: #FFF url(${BannerImage}) no-repeat 50% 0;
	background-size: cover;
	height: 500px;
	margin-top: -50px;
	display: grid;
	grid-template-rows: auto 80px;
	div#search {
		background: rgba(0,0,0,0.5);
	}
	@media (max-width: 575px) {
		grid-template-rows: auto auto;
	}
`
const Slide = styled.div`
	
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
		destaques: []
	}

	componentDidMount = () => {
		this._asyncRequest = api.GetConfigs()
			.then(response => {
				this._asyncRequest = null
				this.setState({ destaques: response.data.destaques })
				console.log(this.state.destaques)
			})
			.catch(err => console.error(err))		
	}

	render () {
		const { destaques } = this.state
		return (
			<section className="pb-5">
				<BannerFull className="container p-0">
					<Slide/>
					<SearchBar/>
				</BannerFull>
				<Container>
					<h2 className="text-center my-4 text-dark">Destaques</h2>
					<div className="row">

						{destaques.length > 0
							? destaques.map(({_id, type, price, title, default_image}) =>
								<Col className="mb-3" xs={12} sm={4}>
									<Destaque _id={_id} type={type} title={title} price={price} default_image={default_image} />
								</Col>)
							: null
						}

					</div>
				</Container>
			</section>
		)
	}
}