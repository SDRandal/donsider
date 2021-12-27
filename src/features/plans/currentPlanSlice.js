import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    plan: null,
    status: 'idle',
    count: 0
}

const currentPlanSlice = createSlice({
    name: "currentPlan",
    initialState,
    reducers: {
        incrementCount(state){
            state.count += 1
        },
        selectPlan(state, action){
            state.plan = action.payload
        },
        deselectPlan(state, action){
            state.plan = null
        },
        //TODO I feel like these three functions indicate that I need to split this state out into two separate slices "plans and planz"
        // addingPropertyItem(state, action){

        // },
        // updatingPropertyItem(state, action){},
        // removingPropertyItem(state, action){},


    }
})

export const { incrementCount, selectPlan, deselectPlan } = currentPlanSlice.actions

export default currentPlanSlice.reducer

export const selectCurrentPlanById = (planId) => (dispatch, getState) => {
const plan = getState().plans[planId]
dispatch(selectPlan(plan))
}





export const selectAllOfProperty = (propertyName)=>  {
    return createSelector(
    (state) => state.currentPlan.plan,
    (plan) => plan[propertyName]
)}



