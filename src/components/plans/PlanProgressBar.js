import React from 'react'

function PlanProgressBar({ taskStats }) {
    const progressBarLength = 1500
    const strokeDiameterInt = 20
    const strokeWidth = strokeDiameterInt + "px"
    const strokeRadius = strokeDiameterInt / 2
    const strokeEnd = progressBarLength - strokeRadius


    const progressBarBackgroundSvgStyle = {
        fill: "none",
        stroke: "#f37a7b",
        strokeLinecap: "round",
        strokeMiterlimit: 10,
        strokeWidth
    }
    const progressBarForegroundSvgStyle = {
        fill: "none",
        stroke: "#F24F4F",
        strokeLinecap: "round",
        // strokeMiterlimit: 10,
        strokeWidth
    }

    const progress = taskStats.totalTasks > 0 ? taskStats.completedTasks / taskStats.totalTasks : 0

    return (
 
            <div>
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 " + progressBarLength + " 20"}>
                            <line x1={strokeRadius} y1={strokeRadius} x2={strokeEnd} y2={strokeRadius} style={progressBarBackgroundSvgStyle} />
                        </svg>
                        <svg className="progress-bar-foreground" xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 " + progressBarLength + " 20"}>
                            <line x1={strokeRadius} y1={strokeRadius} x2={(strokeEnd * progress) + strokeRadius} y2={strokeRadius} style={progressBarForegroundSvgStyle} />
                        </svg>
                    </div>
                    <span className="progress-percentage">{Math.round(progress)}%</span>
                </div>
                <div className="task-ratio">{taskStats.completedSteps}/{taskStats.totalSteps} tasks completed</div>
            </div>
    )
}

export default PlanProgressBar
