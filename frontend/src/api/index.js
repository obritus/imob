import axios from 'axios'
const api = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}api`})

const GetEmpreendimentos = query => api.get(`/empreendimentos${query}`)
const GetCidades = () => api.get('/cidades/')
const GetBairros = () => api.get('/bairros/')
const GetConfigs = () => api.get('/configs/')

const GetEmpreendimento = _id => api.get('/empreendimentos/' + _id)
const GetImages = _id => api.get('/images/' + _id)
const GetCidade = _id => api.get('/cidades/' + _id)
const GetBairro = _id => api.get('/bairros/' + _id)
const getCarousel = () => api.get('/carousel/')

const apis = {
	GetEmpreendimentos,
	GetEmpreendimento,
	GetImages,
	GetCidades,
	GetCidade,
	GetBairros,
	GetBairro,
	getCarousel,
	GetConfigs,
}

export default apis