import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './app.sass'

import Home from './components/sections/'
import Sobre from './components/Sobre'
import Empreendimentos from './components/empreendimentos'
import Empreendimento from './components/empreendimento'
import NotFound from './components/NotFound'
import Contato from './components/Contato'

import Painel from './components/painel/'

export default props =>
	<Router>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/sobre" component={Sobre} />
			<Route path="/empreendimentos" exact component={Empreendimentos} />
			<Route path="/empreendimentos/:id" component={Empreendimento} />
			<Route path="/contact" component={Contato} />
			<Route path="/painel" exact component={Painel} />
			<Route path="/painel/*" exact component={Painel} />
			<Route path="*" component={NotFound} />
		</Switch>
	</Router>