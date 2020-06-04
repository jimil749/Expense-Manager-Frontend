import axios from 'axios'
import queryString from 'query-string'

const baseUrl = '/api/expenses/'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async (params) => {  
    const query = queryString.stringify(params)
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.get(`${baseUrl}?${query}`, config)
    return response.data
}

const monthPreview = async() => {
    const config = {
        headers: {Authorization: token}        
    }
    const response = await axios.get(`${baseUrl}preview`, config)
    return response.data
}

const categoryPreview = async() => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.get(`${baseUrl}category/preview`, config)
    return response.data
}

const addExpense = async(data) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(`${baseUrl}`, data, config)
    return response.data
}

export default { getAll, setToken, monthPreview, categoryPreview, addExpense }
