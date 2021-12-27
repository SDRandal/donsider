import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { selectPlanById } from "../../features/plans/plansSlice"
import GoalInput from "./goals/GoalInput"
import PlanElementTabs from "./PlanElementTabs"
import TagList from "./tags/TagList"
import UserIcons from "./UserIcons"
import EditableInput from "./EditableInput"

function Plan(props) {
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)

    const plan = useSelector((state) => selectPlanById(state, props.match.params.id))

    if (!user) {
        // TODO This check is incomplete. If the users session expires while using the app, a refresh does not send them back to login, it just sends silently errors out. You also cannot go to the login page since there is a user in local storage and the state
        return <Redirect to="/login"></Redirect>
    }

    if (plan) {
        const dueDateText = plan.dueDate ? plan.dueDate : "No due date"
        return (
            <div>
                <div className="plan-heading">
                    <EditableInput tag="h1" text={plan.title} classNames={[]}></EditableInput>
                    {/* <h1>{plan.title}</h1> */}
                    <TagList planId={plan._id} tags={plan.tags}></TagList>


                </div>
                <section className="panel">
                    <div>
                        <h3 className="title micro-margin-bottom">Goal</h3>
                        <GoalInput text={plan.goal} planId={plan._id}></GoalInput>
                    </div>
                    <div className="plan-details-row">
                        <div>
                            <h4>Due Date</h4>
                            <p className="subtext">{dueDateText}</p>
                        </div>
                        <div>
                            <h4>Users</h4>
                            <UserIcons users={plan.users}></UserIcons>
                        </div>

                    </div>
                </section>
                <section>
                    <PlanElementTabs plan={plan}></PlanElementTabs>
                </section>
            </div>
        )

    }
    return <h1>Plan not found</h1>
}
export default Plan