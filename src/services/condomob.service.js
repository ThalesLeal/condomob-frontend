import axios from 'axios'

const semob = axios.create({
  baseURL: process.env.VUE_APP_API_CONDOMOB,
  headers: {
    Authorization: process.env.VUE_APP_TOKEN,
  }
})