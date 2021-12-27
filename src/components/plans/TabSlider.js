import React from 'react'

function TabSlider({currentTab, changeTabFunction}) {

    const handleClick = (event)=>{
        const clickedTab = event.target.innerText.toLowerCase()
        const tabItemElements = document.querySelectorAll(".tab-slider .tab-item")

        tabItemElements.forEach((tab)=>{
            tab.classList.remove("selected")
        })
        event.target.classList.add("selected")
        changeTabFunction(clickedTab)
    }
    const tabItems = ["tasks", "donsiderations", "notes", "attachments"].map((tabItem) => <p key={tabItem} className={"tab-item" + (tabItem == currentTab ? " selected" : "")} onClick={handleClick} >{tabItem.toUpperCase()}</p>)
    return (
        <div className="tab-slider">
            {/* <p className="tab-item selected" onClick={handleClick}>Tasks</p>
            <p className="tab-item" onClick={handleClick}>Donsiderations</p>
            <p className="tab-item" onClick={handleClick}>Notes</p>
            <p className="tab-item" onClick={handleClick}>Attachments</p> */}
            {tabItems}
        </div>
    )
}

export default TabSlider
