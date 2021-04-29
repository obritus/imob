import React from 'react'
import Header from '../../components/Header'
import Empreendimento from './Empreendimento.jsx'
import Footer from '../../components/Footer'

export default (props) => [<Header />, <Empreendimento data={props}/>, <Footer />]