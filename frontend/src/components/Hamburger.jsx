import React from "react"
import styled from 'styled-components'
import MainMenu from './MainMenu'

const InputHamburger = styled.input`
	display: none;
	&:checked ~ label > div::before {
		transform: rotate(225deg);
		top: 40%;
		left: 10%;
	}
	&:checked ~ label > div::after {
		width: 80%;
		top: 40%;
		left: 10%;
		transform: rotate(-225deg);
	}
	&:checked ~ div {
		display: block;
	}
`
const Hamburger = styled.div`
	width: 36px;
	height: 36px;
	position: fixed;
	top: 34px;
	right: 36px;
	z-index: 1101;
	&::before {
		content: '';
		width: 80%;
		height: 15%;
		position: absolute;
		top: 20%;
		background: black;
		transition: .5s ease;
	}
	&::after {
		content: '';
		width: 50%;
		height: 15%;
		position: absolute;
		top: 60%;
		right: 20%;
		background: black;
		transition: .5s ease;
	}
`
const MenuContainer = styled.div`
	border-radius: 16px;
	background: #FFF;
	position: fixed;
	top: 16px;
	right: 16px;
	padding: 62px 0 16px 0;
	text-align: right;
	display: none;
	transition: .5s ease;
	z-index: 1100;
`
const MenuItens = [
	{
		to: '/',
		name: 'Home',
		title: 'Página inicial'
				},
	{
		to: '/sobre',
		name: 'Sobre',
		title: 'Sobre a gente'
				},
	{
		to: '/empreendimentos',
		name: 'Empreendimentos',
		title: 'Nossos empreendimentos'
				},
	{
		to: '/contact',
		name: 'Contato',
		title: 'Entre em contato com a gente'
	}
]

export default () =>
	<div>
		<InputHamburger type="checkbox" name="hamburger" id="hamburger" />
		<label htmlFor="hamburger">
			<Hamburger />
		</label>
		<MenuContainer>
			<MainMenu itens={MenuItens} className="d-sm-block" />
		</MenuContainer>
	</div>