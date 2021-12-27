import axios from "axios"
import { API_URL, MODEL_PATHS } from "../config/constants"
import { getRequestHeaders } from "../features/auth/authSlice"


const addProperty = (ancestors, property, propertyObject) => {
    let propertyURL = API_URL + MODEL_PATHS[property]
    ancestors.forEach((ancestor) => {
        propertyURL += "/" + ancestor
    })
    return axios.post(propertyURL, propertyObject, { headers: getRequestHeaders() })
}
const updateProperty = (ancestors, propertyId, propertyObject, property) => {
    console.log(propertyObject)
    let propertyURL = API_URL + MODEL_PATHS[property]
    ancestors.forEach((ancestor) => {
        propertyURL += "/" + ancestor
    })
    return axios.put(propertyURL + "/" + propertyId, propertyObject, { headers: getRequestHeaders() })


}
const removeProperty = (ancestors, propertyId, property) => {
    let propertyURL = API_URL + MODEL_PATHS[property]
    ancestors.forEach((ancestor) => {
        propertyURL += "/" + ancestor
    })
    return axios.delete(propertyURL + "/" + propertyId, { headers: getRequestHeaders() })


}

export default {
    add: addProperty,
    update: updateProperty,
    delete: removeProperty,
}