import axios from 'axios'
const api = axios.create({ baseURL: 'http://127.0.0.1:4000/api'})

export const getAllProducts = () => api.get('/products')
export const getProduct = _id => api.get('/products/' + _id)
export const getMenu = menu => api.get('/menu/' + menu)

const apis = {
	getAllProducts,
	getProduct
}

export default apis