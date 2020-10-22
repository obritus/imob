import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './public/css/app.css'

import App from './App'
import Sobre from './Sobre'
import Produtos from './Produtos'
import Produto from './Produto'
import NotFound from './NotFound'
import Contato from './Contato'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/sobre" component={Sobre} />
				<Route path="/produtos" exact component={Produtos} />
				<Route path="/produtos/:id" component={Produto} />
				<Route path="/contact" component={Contato} />
				<Route path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
