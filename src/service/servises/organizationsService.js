import axios from "../index";

const get_Railway = (payload)=>{
    return axios.get(`/api/filter/railways`,{params:payload});
}
// get factory request
const get_Organization = (payload)=>{
    return axios.get(`/api/filter/organizations`,{params:payload});
}

const get_Staffs= (payload)=>{
    return axios.get(`/api/filter/staffs`,{params:payload});
}

const getDepartment = (payload)=>{
    return axios.get(`/api/filter/departments`, {params:payload})
}

const getEducation = ()=>{
    return axios.get(`/api/filter/educations`)
}

const getRegions = ()=>{
    return axios.get(`/api/filter/regions`)
}

const getVacations = ()=>{
    return axios.get(`/api/filter/vacations`)
}



export default {get_Railway,get_Organization,getDepartment, get_Staffs, getEducation, getRegions, getVacations}