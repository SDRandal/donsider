import { configureStore } from '@reduxjs/toolkit'

import authReducer  from '../features/auth/authSlice'
import plansReducer from '../features/plans/plansSlice'
import currentPlanReducer from '../features/plans/currentPlanSlice'
import modalReducer from '../features/signals/modals/modalSlice'
import filterReducer from '../features/plans/filterSlice'
import sortReducer from '../features/plans/sortSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        plans: plansReducer,
        currentPlan: currentPlanReducer,
        modal: modalReducer,
        filters: filterReducer,
        sorting: sortReducer
    }
})

export default store