import axios from "../index";


const get_CadryMed = (payload)=>{
    return axios.get(`/api/organization/meds`, {params:payload})
}

const create_CadryMed = (payload)=>{
    return axios.post(`/api/organization/create-med`, payload.data)
}

const update_CadryMed = (payload)=>{
    return axios.post(`/api/organization/med/${payload.id}/accepted`, payload.data)
}



export default {get_CadryMed,create_CadryMed, update_CadryMed}