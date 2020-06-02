import axios from 'axios'
const baseUrl = '/api/expenses/'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {  
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.get(baseUrl, config)
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

export default { getAll, setToken, monthPreview, categoryPreview }
