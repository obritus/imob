import React from 'react'
import Header from './Header'
import SectionContato from './sections/Contato'
import Footer from './Footer'

export default props => [<Header />, <SectionContato data={props} />, <Footer />]