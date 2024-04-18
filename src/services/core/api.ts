import axios from 'axios'
const userID = localStorage.getItem('userID')

const instance = axios.create({
    baseURL: 'https://4kxhyj-8080.csb.app/api'
})

instance.defaults.headers.common['Authorization'] = `Bearer ${userID}`

export default instance
