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
			<Switch>
				<Route key="1" path="/" exact component={App} />
				<Route key="2" path="/sobre" component={Sobre} />
				<Route key="2" path="/empreendimentos" component={Empreendimentos} />
				<Route key="2" path="/empreendimentos/:id" component={Empreendimento} />
				<Route key="5" path="/contact" component={Contato} />
				<Route key="6" path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
