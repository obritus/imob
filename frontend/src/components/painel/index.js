import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './template/Header'
import Section from './template/Section'
import Footer from './template/Footer'

import Home from './home'
import Empreendimentos from './empreendimentos/index'
import EmpreendimentosCreate from './empreendimentos/create'
import EmpreendimentosShow from './empreendimentos/create'
import Cidades from './cidades/index'
import Usuarios from './usuarios/index'
import Settings from './settings/index'

export default () =>
	[<Header />,
	<Section>
		<Switch>
			<Route path={`/painel`} component={Home} exact />
			<Route path={`/painel/empreendimentos`} component={Empreendimentos} exact />
			<Route path={`/painel/empreendimentos/create`} component={EmpreendimentosCreate} exact />
			<Route path={`/painel/empreendimentos/show/:id`} component={EmpreendimentosShow} exact />
			<Route path={`/painel/cidades`} component={Cidades} exact />
			<Route path={`/painel/usuarios`} component={Usuarios} exact />
			<Route path={`/painel/settings`} component={Settings} exact />
		</Switch>
	</Section>,
	<Footer />]