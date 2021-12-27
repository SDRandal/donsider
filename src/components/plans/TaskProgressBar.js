import React from 'react'

function TaskProgressBar({ steps }) {
    const completedSteps = steps.filter((step) => {
        return step.status === true
    })
    const progress = steps.length > 0 ? completedSteps.length / steps.length : 0;

    const strokeDiameter = 20
    const strokeWidth = strokeDiameter + "px"
    const strokeRadius = strokeDiameter / 2
    const strokeEnd = 250 - strokeRadius


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
    return (
        <div>
            <div className='progress-bar-container'>
                <div className="progress-bar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 20">
                        <line x1={strokeRadius} y1={strokeRadius} x2={strokeEnd} y2={strokeRadius} style={progressBarBackgroundSvgStyle} />
                    </svg>
                    <svg className="progress-bar-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 20">
                        <line x1={strokeRadius} y1={strokeRadius} x2={(strokeEnd * progress) + (progress > 0 ? 0 : strokeRadius)} y2={strokeRadius} style={progressBarForegroundSvgStyle} />
                    </svg>
                </div>
            </div>
            <div className="subtext xsmall-margin-bottom">{completedSteps.length}/{steps.length} steps completed</div>
        </div>
    )
}

export default TaskProgressBar
