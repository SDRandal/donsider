import React from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux"
import PlanList from "./PlanList";
import PlansHeader from "./PlansHeader";

function PlansPage(props) {
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)

    if (!user) {
        return <Redirect to="/login"></Redirect>
    }

    // TODO For some reason the plan list is being rerendered everytime I type into my form... Need to figure that out
    return (
        <div>
            <PlansHeader></PlansHeader>
            <PlanList></PlanList>
        </div>
    )


}

export default PlansPage