import axios from 'axios'
const api = axios.create({ baseURL: 'http://127.0.0.1:3001/api'})

export const GetEmpreendimentos = () => api.get('/empreendimentos/')
export const GetCidades = () => api.get('/cidades/')
export const GetBairros = () => api.get('/bairros/')

export const GetEmpreendimento = _id => api.get('/empreendimentos/' + _id)
export const GetCidade = _id => api.get('/cidades/' + _id)
export const GetBairro = _id => api.get('/bairros/' + _id)
export const getCarousel = () => api.get('/carousel/')

const apis = {
	GetEmpreendimentos,
	GetEmpreendimento,
	GetCidades,
	GetCidade,
	GetBairros,
	GetBairro,
	getCarousel,
}

export default apis