import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper";

export const fetchAppointments = async() =>{
    return await commonrequest("GET",`${BASE_URL}/appointments`,"","");
}
export const fetchAppointmentById = async(id) => {
    return await commonrequest("GET",`${BASE_URL}/appointments/${id}`,"","");
}
export const fetchAllAppointmentsByEmail = async(email) => {
    return await commonrequest("GET",`${BASE_URL}/appointments/all/${email}`,"","");
}
export const updateAppointment = async(orderId) => {
    return await commonrequest("PUT",`${BASE_URL}/appointments/${orderId}`,"","");
}

export const fetchCarServices = async() => {
    return await commonrequest("GET",`${BASE_URL}/car-service`,"","");
}

export const createNewOrder = async(data) => {
    return await commonrequest("POST",`${BASE_URL}/order/createOrder`,data,"");
}

export const creatOrGetUser = async(data) => {
    return await commonrequest("POST",`${BASE_URL}/users`,data,"");
}

export const saveCartDetails = async(data) =>{
    return await commonrequest("POST",`${BASE_URL}/users/cart`,data,"");
}

export const fetchOrderDetailsById = async(orderId) =>{
    return await commonrequest("GET",`${BASE_URL}/order/${orderId}`,"","");
}

// export const b = async(data) =>{
//     return await commonrequest("",`${BASE_URL}/`,data,"");
// }

// export const c = async(data) =>{
//     return await commonrequest("",`${BASE_URL}/`,data,"");
// }