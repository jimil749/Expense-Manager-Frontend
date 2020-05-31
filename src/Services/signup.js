import axios from 'axios'
const baseUrl = '/api/user/'


const signup = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { signup }