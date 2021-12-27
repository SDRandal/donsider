import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { selectPlans, selectFilteredSortedPlans } from '../../features/plans/plansSlice';
import PlanListItem from './PlanListItem';

function PlanList() {
    const plans = useSelector(selectPlans)
    const filteredPlans = useSelector(selectFilteredSortedPlans)

    const planListItems = filteredPlans.map((plan) => {
        return <PlanListItem plan={plan} key={plan._id} />

    })

    return (
        <div>
            <div className="grid-list  plan-list">{planListItems}</div>
        </div>  
    )
}

export default PlanList
