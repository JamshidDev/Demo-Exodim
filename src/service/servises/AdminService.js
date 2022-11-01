import axios from "../index";

// lodin admin request
const get_AdminList = (payload)=>{
    console.log(payload);
    return axios.get(`/api/administration/users`, {params:payload})
}

const update_get_AdminDetails = (payload)=>{
    return axios.get(`/api/administration/user/${payload.id}/update`)
}

const update_AdminDetails = (payload)=>{
    return axios.post(`/api/administration/user/${payload.id}/update`)
}

const create_get_Admin = (payload)=>{
    return axios.get(`/api/administration/user/create`)
}
const create_Admin = (payload)=>{
    return axios.post(`/api/administration/user/create`, payload.data )
}



export default {get_AdminList,update_get_AdminDetails,update_AdminDetails,create_get_Admin,create_Admin}