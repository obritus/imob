import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import Empreendimentos from './Empreendimentos.jsx'
import Footer from '../../components/Footer'

export default props => [
	<Header />,
	<Empreendimentos data={props} location={useLocation()} />,
	<Footer />
]