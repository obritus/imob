import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './app.sass'

	import App from './App'
	import Sobre from './Sobre'
	import Empreendimentos from './components/empreendimentos'
		import Empreendimento from './components/empreendimentos/Empreendimento'
	import NotFound from './NotFound'
	import Contato from './Contato'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch key={123}>
				<Route path="/" exact component={App} />
				<Route path="/sobre" component={Sobre} />
				<Route path="/empreendimentos" component={Empreendimentos} />
				<Route path="/empreendimentos/:id" component={Empreendimento} />
				<Route path="/contact" component={Contato} />
				<Route path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
