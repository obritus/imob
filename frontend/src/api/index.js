import axios from 'axios'
const api = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}api`})

export const GetEmpreendimentos = () => api.get('/empreendimentos/')
export const GetCidades = () => api.get('/cidades/')
export const GetBairros = () => api.get('/bairros/')

export const GetEmpreendimento = _id => api.get('/empreendimentos/' + _id)
export const GetImages = _id => api.get('/images/' + _id)
export const GetCidade = _id => api.get('/cidades/' + _id)
export const GetBairro = _id => api.get('/bairros/' + _id)
export const getCarousel = () => api.get('/carousel/')

const apis = {
	GetEmpreendimentos,
	GetEmpreendimento,
	GetImages,
	GetCidades,
	GetCidade,
	GetBairros,
	GetBairro,
	getCarousel,
}

export default apis