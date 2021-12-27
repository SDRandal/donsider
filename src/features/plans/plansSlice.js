import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/constants";
import { getRequestHeaders } from "../auth/authSlice";
import { logout } from "../auth/authSlice";
import planPropertyService from "../../services/planPropertyService";
import { StatusFiltersObjects } from "./filterSlice";
import compareAsc from 'date-fns/compareAsc'
import startOfDay from 'date-fns/startOfDay'
import { getMultiSort, sortOrderSelector } from "./sortSlice"; 
import { useSelector } from "react-redux";

const initialState = {
    collection: {},
    status: 'idle'
}

const plansSlice = createSlice({
    name: "plans",
    initialState,
    reducers: {
        planAdded(state, action) {
            const plan = action.payload
            state.collection[plan._id] = plan
        },
        planRemoved(state, action) {
            delete state.collection[action.payload]
        },
        plansLoading(state, action) {
            state.status = 'loading'
        },
        plansLoaded(state, action) {
            const newPlansCollection = {}
            action.payload.forEach(plan => {
                newPlansCollection[plan._id] = plan
            })
            state.collection = newPlansCollection
            state.status = 'idle'
        },
        planUpdating(state, action) {
            state.status = 'loading'
        },
        planUpdateSuccess(state, action) {
            // TODO By not separating these
            state.collection[action.payload.planId][action.payload.propertyType] = action.payload.newProperty
            state.status = 'idle'
        },
        planUpdateFailure(state, action) {
            state.status = 'idle'
        }

    }
})

export const { planAdded, planRemoved, plansLoading, plansLoaded, planUpdating, planUpdateSuccess, planUpdateFailure } = plansSlice.actions

export default plansSlice.reducer

const selectPlansCollection = (state) => state.plans.collection

// TODO I don't completely understand what createSelector is used for or how it memoizes what gets passed to it, and I do not have time to understand it atm, 
// Come back to this rabbit hole later
export const selectPlans = createSelector(selectPlansCollection, (plans) => Object.values(plans))

export const selectFilteredSortedPlans = createSelector(selectPlans, (state) => state.filters, (state) => state.sorting.sortOrder,
    (plans, filters, sortOrder) => {
        // console.log(filterSort)
        const { status: statusFilters, createDate: createDateFilter, dueDate: dueDateFilter } = filters
        // TODO this is getting fired twice and I'm not sure why, the state should only be getting loaded once. does 
        const filteredPlans = plans.filter((plan) => {
            const tasks = plan.tasks
            // TODO This feels kinda naive
            const steps = []
            tasks.forEach((task) => {
                task.steps.forEach((step) => {
                    steps.push(step)
                })
            })

            const completedSteps = steps.filter((step) => {
                return step.status
            })
            const completionPercentage = completedSteps.length > 0 ? Math.round(100 * (completedSteps.length / steps.length)) : 0
            // console.log(completionPercentage)
            let statusFilterFlag = statusFilters.some((filter) => {
                const filterObj = StatusFiltersObjects[filter]
                return completionPercentage >= filterObj.start && completionPercentage <= filterObj.end
            })
            if (statusFilters.length === 0) {
                statusFilterFlag = true
            }
            const createDateStartFlag = createDateFilter.start == null || compareAsc(startOfDay(new Date(plan.createDate)), startOfDay(new Date(createDateFilter.start))) >= 0
            const createDateEndFlag = createDateFilter.end == null || compareAsc(startOfDay(new Date(createDateFilter.end)), startOfDay(new Date(plan.createDate))) >= 0

            // let createDateFilterFlag = compareAsc()  && compareAsc(new Date(plan.createDate), new Date(createDateFilter.end)) <=0
            // if(createDateFilter.start === null && createDateFilter.end === null){
            //     createDateFilterFlag = true
            // }
            return statusFilterFlag && createDateStartFlag && createDateEndFlag
        })
        const multiSort = getMultiSort(sortOrder)
        const sortedPlans = filteredPlans.sort(multiSort)

        return sortedPlans
    }
)
export const getAllPlans = () => async (dispatch) => {
    dispatch(plansLoading())
    axios.get(API_URL + "plans", { headers: getRequestHeaders(), withCredentials: true })
        .then((response) => {
            dispatch(plansLoaded(response.data))
        })
        .catch((err) => {
            console.log(err)
            dispatch(logout())
            // TODO I need to add a message when this fails
        })
}

export const selectPlanIds = createSelector(
    selectPlans,
    (plans) => plans.map((plan) => plan._id)
)

export const selectPlanTitles = createSelector(
    selectPlans,
    (plans) => plans.map((plan) => plan.title)
)

export const selectPlanById = (state, planId) => {
    return selectPlansCollection(state)[planId]
}

export const addPlan = (plan) => async (dispatch) => {
    axios.post(API_URL + "plan", plan, { headers: getRequestHeaders() })
        .then((response) => {
            dispatch(planAdded(response.data))
        })
        .catch((error) => {
            console.log(error.response)
        })
}

export const updatePlan = (planId, propertyType, updateObj) => async (dispatch) => {
    dispatch(planUpdating())
    return axios.put(API_URL + "plan/" + planId + "?p=" + propertyType, updateObj, { headers: getRequestHeaders() })
        .then(
            (response) => {
                console.log(response.data)
                if (response.data.plan) {
                    planUpdateSuccess()
                }
            })
}


export const deletePlan = (planId) => async (dispatch) => {
    axios.delete(API_URL + "plan/" + planId, { headers: getRequestHeaders() })
        .then(() => {
            dispatch(planRemoved(planId))
        })
        .catch((error) => {
            console.log(error.response)
        })
}

export const addProperty = (ancestors, property, propertyObject) => async (dispatch) => {
    planPropertyService.add(ancestors, property, propertyObject)
        .then((response) => {
            dispatch(planUpdateSuccess(response.data))
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateProperty = (ancestors, propertyId, propertyObject, property) => async (dispatch) => {
    return planPropertyService.update(ancestors, propertyId, propertyObject, property)
        .then((response) => {
            dispatch(planUpdateSuccess(response.data))
            return response
        })
        .catch((err) => {
            console.log(err.response)
        })
}


export const deleteProperty = (ancestors, propertyId, property) => async (dispatch) => {
    planPropertyService.delete(ancestors, propertyId, property)
        .then((response) => {
            dispatch(planUpdateSuccess(response.data))
        })


}
export const uploadFile = (planId, formData) => async (dispatch) => {
    return axios.post(API_URL + "plan/attachment/" + planId, formData, { headers: getRequestHeaders() })
        .then((response) => {
            dispatch(planUpdateSuccess(response.data))
            // return dispatch(addProperty(response.addData))
        }).catch((error) => {
            console.log(error.response)
        })
}



