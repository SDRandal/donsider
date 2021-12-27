import React, { useState } from 'react'
import TabSlider from './TabSlider'
import TaskList from './tasks/TaskList'
import DonsiderationList from './donsiderations/DonsiderationList'
import NoteItemList from './notes/NoteItemList'
import AttachmentItemList from './attachments/AttachmentItemList'

function PlanElementTabs({plan}) {

    const [currentTabName, setCurrentTabName] = useState("tasks")
    const tabs = {
        tasks:<TaskList planId={plan._id} tasks={plan.tasks}></TaskList>,
        donsiderations:<DonsiderationList planId={plan._id} donsiderations={plan.donsiderations}></DonsiderationList>,
        notes:<NoteItemList planId={plan._id} notes={plan.notes}></NoteItemList>,
        attachments:<AttachmentItemList planId={plan._id} attachments={plan.attachments}></AttachmentItemList>
    }
    const currentTab = tabs[currentTabName]
    return (
        <div>
            <TabSlider currentTab={currentTabName} changeTabFunction={setCurrentTabName}></TabSlider>
            {currentTab}
        </div>
    )
}

export default PlanElementTabs
