import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { deletePlan } from "../../features/plans/plansSlice"
import PlanProgressBar from "./PlanProgressBar"
import UserIcons from "./UserIcons"
import dateFnsFormat from 'date-fns/format'

function PlanListItem({ plan }) {

    const dispatch = useDispatch()

    const handleDelete = (event) => {
        event.preventDefault()
        dispatch(deletePlan(plan._id))
    }

    const getPlanTaskStats = () => {
        const taskStats = {
            totalTasks: plan.tasks.length,
            completedTasks: 0,
            totalSteps: 0,
            completedSteps: 0
        }
        plan.tasks.forEach(task => {
            let taskCompleted = true
            taskStats.totalSteps += task.steps.length
            task.steps.forEach((step) => {
                if (step.status !== "Completed") {
                    taskCompleted = false
                }
                if (step.status === "Completed") {
                    taskStats.completedSteps += 1
                }
            })
            if (taskCompleted) {
                taskStats.completedTasks += 1
            }
        })
        return taskStats
    }
    // TODO consider moving something like this into a utils file, maybe move the whole dateFnsFormat function to that file so all I have to do is import it
    const dateFormat = 'PPP'

    const planTaskStats = getPlanTaskStats()
    return (
        <div className="panel plan-panel">
            <Link to={"/plan/" + plan._id}>
                <div className="plan-list-item-header">
                    <span className="plan-list-item-title title">{plan.title}</span>
                    <span className="plan-delete-button warning-text" onClick={handleDelete} >delete</span>

                </div>
                <PlanProgressBar taskStats={planTaskStats}></PlanProgressBar>
                <div className="grid-list triple no-height">
                    <div className="border-right">
                        <h4>Created</h4>
                        <p className="subtext">{plan.createDate ? dateFnsFormat(new Date(plan.createDate), dateFormat) : "1,000 years ago"}</p>
                    </div>
                    <div className="border-right">
                        <h4>Due Date</h4>
                        <p className="subtext">{plan.dueDate ? dateFnsFormat(new Date(plan.dueDate), dateFormat) : "No due date set"}</p>
                    </div>
                    <div>
                        <h4>Users</h4>
                        <UserIcons users={plan.users}></UserIcons>

                    </div>
                    {/* TODO Having the tag on the plan card is just not working. There is a possibility that there are too many tags which breaks the uniformity of the grid. Only way to address that uniformity is to hide some of the tags, but that defeats the purpose of them being there. For example, if I want to sort by tags, but the tag that I am sorting for is hidden, I think that could cause some confusion for a user. A way around this could be to have the tags order update based on the filters */}
                </div>
                {/* <div className="plan-tag-container">
                    {tags}
                </div> */}
            </Link>

        </div>
    )
}

export default PlanListItem