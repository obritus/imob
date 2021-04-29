import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './app.sass'

	import App from './App'
	import Sobre from './Sobre'
	import Empreendimentos from './components/empreendimentos'
		import Empreendimento from './components/empreendimento'
	import NotFound from './NotFound'
	import Contato from './Contato'

ReactDOM.render(
	<React.StrictMode>
		<Router keyLength={12}>
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/sobre" component={Sobre} />
				<Route path="/empreendimentos" exact component={Empreendimentos} />
				<Route path="/empreendimentos/:id" component={Empreendimento} />
				<Route path="/contact" component={Contato} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
