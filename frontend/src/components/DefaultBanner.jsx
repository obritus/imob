import React, { useState } from 'react'
import styled from 'styled-components'

const BannerFull = styled.div`
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	background: #FFF url('/images/empreendimentos/${props => props._id + '/' + props.img}') no-repeat 50% 0;
	background-size: cover;
	height: 500px;
	margin-top: -50px;
	display: grid;
	grid-template-rows: auto 80px;
	align-items: stretch;
	div#search {
		background: rgba(0,0,0,0.5);
	}
	@media (max-width: 575px) {
		grid-template-rows: auto auto;
	}
`
export default props =>
	<BannerFull className="container p-0 bg-danger">
		{props.children}
	</BannerFull>