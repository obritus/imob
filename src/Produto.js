import React from 'react'
import Header from './components/Header'
import SectionProduct from './components/sections/Product'
import Footer from './components/Footer'
import { useParams } from 'react-router-dom'

export default props => [<Header />, <SectionProduct data={useParams()} />, <Footer />]