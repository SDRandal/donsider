import { createSlice, createSelector } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_URL } from "../../config/constants";
// import { getRequestHeaders } from "../auth/authSlice";

export const StatusFiltersObjects = {
    Completed: { start: 100, end: 100, label: "Completed" },
    NearlyComplete: { start: 80, end: 99, label: "Nearly complete" },
    MostlyDone: { start: 60, end: 79, label: "Mostly done" },
    MidwayPoint: { start: 40, end: 59, label: "Midway point" },
    GettingStarted: { start: 1, end: 39, label: "Getting started" },
    NotStarted: { start: 0, end: 0, label: "Not started" },

}

const initialState = {
    createDate: { start: null, end: null },
    dueDate: { start: null, end: null },
    status: [],
    something: []
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        statusFilterChanged(state, action) {
            let { statusFilter, changeType } = action.payload
            // const {status} = state
            switch (changeType) {
                case 'added': {
                    if (!state.status.includes(statusFilter)) {
                        state.status.push(statusFilter)
                    }
                    break
                }
                case 'removed': {
                    state.status = state.status.filter((existingStatusFilter) => {
                        return existingStatusFilter !== statusFilter
                    })
                }
                default:
                    return
            }
        },
        createDateFilterChanged(state, action) {
            const {day, position} = action.payload
            state.createDate[position] = day
        },
        dueDateFilterChanged(state, action) {
            const {day, position} = action.payload
            state.dueDate[position] = day
        },
    }
})

export const { statusFilterChanged, createDateFilterChanged, dueDateFilterChanged } = filterSlice.actions

export default filterSlice.reducer


// const select
