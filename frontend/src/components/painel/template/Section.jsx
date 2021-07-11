import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Section = styled.section`
	background: #302E37;
	display: grid;
	min-height: 100vh;
	grid-template-columns: 300px auto;
	aside {
		min-height: 100%;
		background: #3e3a4d;
		#logo {
			width: 50px;
			height: 50px;
			background: url('/images/imobjs_logo.svg') no-repeat 50% 50%;
		}
		h1 {
			font-size: 1.2em;
			line-height: 50px;
			padding-left: 10px;
			margin-left: 10px;
			border-left: 1px solid #e47f37;
			color: $primary;
		}
		.nav {
			text-align: right;
			.nav-link {
				padding-right: 0;
			}
			a {
				width: 100%;
				font-size: 1.2em;
				font-weight: 700;
				align-items: baseline;
				padding: .3em 0;
				&:hover {
					color: #e47f37;
				}
			}
			.active {
				color: #e47f37;
				&:hover {
					color: #e47f37;
				}
			}
		}
	}
.nav-link {
	color: #FFF;
}
`

export default props =>
	<Section>
		<aside className="px-3">
			<div className="py-3 d-flex justify-content-center">
				<Link to="/painel">
					<div id="logo"></div>
					<h1 className="ml-3 user-select-none">Painel de controle</h1>
				</Link>
			</div>
			<nav className="nav">
				<Link className="nav-link" to="/painel">Início</Link>
				<Link className="nav-link" to="/painel/empreendimentos">Empreendimentos</Link>
				<Link className="nav-link" to="/painel/cidades">Cidades</Link>
				<Link className="nav-link" to="/painel/usuarios">Usuários</Link>
				<Link className="nav-link" to="/painel/settings">Configurações</Link>
				<Link className="nav-link" to="/painel/logout">Sair</Link>
			</nav>
		</aside>
		<div className="container-fluid p-3" >
			{props.children}
		</div>
	</Section>