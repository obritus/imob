import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './app.sass'

import Home from './components/sections/'
import Sobre from './components/Sobre'
import Empreendimentos from './components/empreendimentos'
import Empreendimento from './components/empreendimento'
import NotFound from './components/NotFound'
import Contato from './components/Contato'

export default props =>
	<Router key={Math.random()}>
		<Switch key={Math.random()}>
			<Route key={Math.random()} path="/" exact component={Home} />
			<Route key={Math.random()} path="/sobre" component={Sobre} />
			<Route key={Math.random()} path="/empreendimentos" exact component={Empreendimentos} />
			<Route key={Math.random()} path="/empreendimentos/:id" component={Empreendimento} />
			<Route key={Math.random()} path="/contact" component={Contato} />
			<Route key={Math.random()} path="*" component={NotFound} />
		</Switch>
	</Router>