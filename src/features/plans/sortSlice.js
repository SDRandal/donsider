import { createSlice, createSelector } from "@reduxjs/toolkit";
import compareAsc from 'date-fns/compareAsc'
import { useSelector } from "react-redux";
import startOfDay from 'date-fns/startOfDay'

export const sortParameters = [{ property: 'createDate', label: 'Create Date' }, { property: 'dueDate', label: 'Due Date' }, { property: 'title', label: 'Title' }, { property: 'progress', label: 'Progress' }]

const initialState = {
    // TODO rename this, sort order doesn;t work for the name of a collection does it? 
    sortOrder: [
        {
            property: "createDate",
            direction: 1,
            position: 0
        },
        // {
        //     property: "title",
        //     direction: -1,
        //     position: 1
        // }
    ]
}

const sortSlice = createSlice({
    name: "sorting",
    initialState,
    reducers: {
        sortParameterInserted(state, action) {
            state.sortOrder.push(action.payload)
        },
        sortParameterRemoved(state, action) {
            state.sortOrder = state.sortOrder.filter((sortOrderItem) => sortOrderItem.property != action.payload)
            .map((sortOrderItem, i)=> {
                sortOrderItem.position = i
                return sortOrderItem
            })
        },
        sortParameterToggled(state, action) {
            state.sortOrder = state.sortOrder.map((sortOrderItem) => {
                if (sortOrderItem.property === action.payload) {
                    sortOrderItem.direction = -1
                }
                return sortOrderItem
            })
        },
        sortOrderReset(state, action){
            state.sortOrder = initialState.sortOrder
        }

    }
})

export const { sortParameterInserted, sortParameterRemoved, sortParameterToggled, sortOrderReset } = sortSlice.actions

export default sortSlice.reducer

export const sortOrderSelector = createSelector(state => state.sorting.sortOrder, (sortOrder) => sortOrder)

export const getMultiSort = (sortOrder) => {
    return (a, b) => {
        let i = 0, result = 0
        while (i < sortOrder.length && result === 0) {
            const sortItem = sortOrder.find(item => item.position === i)

            let leftSide = a[sortItem.property]
            let rightSide = b[sortItem.property]
            // console.log(leftSide, "\n", rightSide);

            if (!leftSide) {
                // console.log("leftside null");
                result = 1
                break
            }
            if (!rightSide) {
                // console.log("rightside null");
                result = -1
                break
            }
            if (sortItem.property == 'createDate' || sortItem.property == 'dueDate') {
                leftSide = startOfDay(new Date(leftSide)).toString()
                rightSide = startOfDay(new Date(rightSide)).toString()
            }
            if (leftSide && rightSide) {
                const comparison = leftSide.localeCompare(rightSide)
                // const comparison = sortItem.property != "createDate" && sortItem.property !== "dueDate" ? a[sortItem.property].localCompare(b[sortItem.property]) : compareAsc(a[sortItem.property], b[sortItem.property])
                result = sortItem.direction * comparison
            }
            i++
        }
        return result
    }
}