import React from 'react'
import ProItemList from './ProItemList'
import ConItemList from './ConItemList'

// TODO I am finding myself repeating alot of boilerplate here. Not sure what to do, but I know repeating myself is not great. MAybe think about making a component that takes in an entity and can outputvarious things... I think this is all boilerplate because I am sprinting though. There are going to be unique cases for each ot these entities I think
function OptionItem({ option, planId, donsiderationId, showModalFunction }) {

    const optionContent = option.content ? option.content : "No content"
    const handleRemove = () => {
        showModalFunction([planId, donsiderationId], option._id, "option")
    }



    return (
        <div className='subitem panel'>
            {/* TODO reading if the property exist for each item would be tedious and look sloppy, maybe I just iterate over all the keys and print values, depending on if it is a collection or not? */}
            {/* TODO I could use like a dictionary or something to handle what properties do not get shown and what component to use based on the keys */}
            <p className='subitem-title'>{optionContent} <span className="delete-item-button" onClick={handleRemove}>x</span></p>

            {/* Maybe the omve here is to pass an array, but then using sperad operators, pass a new array to each child, while adding the ancestorId with each deeper level */}
            <div className='grid-list double'>
                <ProItemList pros={option.pros} planId={planId} optionId={option._id} donsiderationId={donsiderationId} ></ProItemList>
                <ConItemList cons={option.cons} planId={planId} optionId={option._id} donsiderationId={donsiderationId} ></ConItemList>
            </div>
        </div >
    )
}


export default OptionItem

