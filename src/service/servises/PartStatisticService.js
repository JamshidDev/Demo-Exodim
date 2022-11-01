import axios from "../index";


const get_PartStatistic = (payload)=>{
    return axios.get(`/api/organization/statistics`, {params:payload})
}

const get_LeaderCadryStatistic = (payload)=>{
    return axios.get(`/api/organization/leader/statistics`, {params:payload})
}




export default {get_PartStatistic,get_LeaderCadryStatistic}