/* eslint-disable arrow-body-style */
import axios from 'axios'
import { consts } from '../Constants';

const instance = axios.create({
    baseURL: consts.API_URL,
    timeout: 15 * 1000,

})



instance.interceptors.request.use(async (request) => {
    // console.log("REQUEST --->", request);
    return request
}, (err) => {
    alert("Connection Error", "Check your internet connection")
})

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error 
    if (error.response.status === 404) {
        alert("Connection Error", "Check your internet connection")
    }

    return Promise.reject(error)
})

export default instance