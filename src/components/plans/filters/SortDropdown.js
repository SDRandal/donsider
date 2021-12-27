import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortParameters, sortParameterInserted, sortParameterRemoved, sortParameterToggled, sortOrderReset } from '../../../features/plans/sortSlice'

function SortDropdown() {

    const [dropdownShowing, setDropdownShowing] = useState(false)

    const { sortOrder } = useSelector((state) => state.sorting)

    const dispatch = useDispatch()

    const toggleDropdown = () => {
        setDropdownShowing(!dropdownShowing)
    }

    const sortParameterItems = sortParameters.map((sortParameter) => {

        const handleChange = () => {
            // I gotta say, this seems more complcated that it needs to be...
            const existingSortOrderItem = sortOrder.find((sortOrderEntry) => sortOrderEntry.property == sortParameter.property)
            if (existingSortOrderItem) {
                if (existingSortOrderItem.direction === -1) {
                        dispatch(sortParameterRemoved(sortParameter.property))
                        if(sortOrder.length == 1){
                            dispatch(sortOrderReset())
                        }
                    
                } else {
                    dispatch(sortParameterToggled(sortParameter.property))
                }

            } else {
                const newSortOrderItem = { property: sortParameter.property, direction: 1, position: sortOrder.length }

                dispatch(sortParameterInserted(newSortOrderItem))
            }

            if(sortOrder.length == 0){
                dispatch(sortOrderReset())

            }
        }
        return <div key={sortParameter.property} className='dropdown-option'>
            <input checked={sortOrder.some((sortOrderItem)=> sortOrderItem.property == sortParameter.property)} onChange={handleChange} value={sortParameter.property} type="checkbox" name={sortParameter.property + '-checkbox'} id={sortParameter.property + '-checkbox'} />
            <label className='dropdown-label' htmlFor={sortParameter.property + "-checkbox"}>{sortParameter.label}</label>
        </div>
    })

    const dropdown = <div className='detached dropdown'>
        <div>
            {sortParameterItems}
        </div>
    </div>
    return (
        <div id='sort'>
            <div onClick={toggleDropdown} className="button button-hollow mid flex-space-around">
                <span>Sort</span>
                <img alt="filter" src="https://d1c99iomjiepbv.cloudfront.net/public/images/sort.svg" />
            </div>
            {dropdownShowing && dropdown}
        </div>
    )
}

export default SortDropdown
