import axios from 'axios'

const api = process.env.ACCOUNT_APP_API_RECORDS_URL || "https://5bc75e56cc83760013c1cce0.mockapi.io";

export const getRecords = () =>
    axios.get(`${api}/api/v1/records`)


export const createRecord = (record) =>
    axios.post(`${api}/api/v1/records`,record)


export const updateRecord = (id, record) =>
    axios.put(`${api}/api/v1/records/${id}`,record)

export const deleteRecord = (id) =>
    axios.delete(`${api}/api/v1/records/${id}`)