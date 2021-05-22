import React, { Component } from 'react'
import { Container, Spinner } from 'reactstrap'
import styled from 'styled-components'
import Destaque from './Destaque'
import BannerImage from '../images/banner-home.jpg'
import SearchBar from './SearchBar'

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
		
	}

	render () {
		return (
			<section className="pb-5">
				<BannerFull className="container p-0">
					<Slide/>
					<SearchBar/>
				</BannerFull>
				<Container>
					<h2 className="text-center my-4 text-dark">Destaques</h2>
					<div className="row">
						<div className="col-sm pt-3">
							<Destaque price={750} type={1} default_image="http://192.168.1.6:3001/images/empreendimentos/60875cd0d478e83e30169403/1304cda569e38bf8e0791c723acb77e4.jpg" />
						</div>
						<div className="col-sm pt-3">
							<Destaque price={2500000} type={2} default_image="http://192.168.1.6:3001/images/empreendimentos/60875cd0d478e83e30169403/9e033a01ca62c99d973043ba02980073.jpg" />
						</div>
						<div className="col-sm pt-3">
							<Destaque price={1100} type={1} default_image="http://192.168.1.6:3001/images/empreendimentos/6093555b3154982f68c50815/22932213ff006b258a6089908b173764.jpg"/>
						</div>
					</div>
				</Container>
			</section>
		)
	}
}