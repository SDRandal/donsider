import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StatusFiltersObjects, statusFilterChanged, createDateFilterChanged, dueDateFilterChanged } from '../../../features/plans/filterSlice'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DayPicker from 'react-day-picker/DayPicker'
import dateFnsFormat from 'date-fns/format'
import startOfMonth from 'date-fns/startOfMonth'
import 'react-day-picker/lib/style.css';

function FilterDropdown() {
    const [dropdownShowing, setDropdownShowing] = useState(false)

    const { status: statusFilters, createDate, dueDate } = useSelector((state) => state.filters)
    const dispatch = useDispatch()

    const onChange = (statusFilter, changeType) => {
        dispatch(statusFilterChanged({ statusFilter, changeType }))
    }

    const filteredStatusItems = Object.keys(StatusFiltersObjects).map((key) => {


        const checked = statusFilters.includes(key)

        const handleChange = () => {
            const changeType = checked ? 'removed' : 'added'
            onChange(key, changeType)
        }

        return (
            <div key={key} className='dropdown-option' >
                <input id={key} type="checkbox" checked={checked} onChange={handleChange} />
                <label htmlFor={key} className="dropdown-label" >{StatusFiltersObjects[key].label}</label>
            </div>
        )
    })

    const toggleDropdown = () => {
        setDropdownShowing(!dropdownShowing)
    }

    const handleCreateDateStartDayClick = (day) => {
            dispatch(createDateFilterChanged({ day: day? day.toDateString():null, position: "start" }))

        
    }
    const handleCreateDateEndDayClick = (day) => {
            dispatch(createDateFilterChanged({ day: day? day.toDateString():null, position: "end" }))

    }
    const handleDueDateStartDayClick = (day) => {
            dispatch(dueDateFilterChanged({ day: day? day.toDateString():null, position: "start" }))

    }
    const handleDueDateEndDayClick = (day) => {
            dispatch(dueDateFilterChanged({ day: day? day.toDateString():null, position: "end" }))

    }

    const formatDate = (date, format, locale) => {
        return dateFnsFormat(date, "PPP", { locale })
    }
    const dateFormat = "PPP"
    const format2 = () => {
        console.log(dateFnsFormat(new Date(), dateFormat))
    }


    const dropdown = <div className='filter detached dropdown'>
        <div className='normal-margin-bottom'>
            <div className='dropdown-option-container'>
                <p className='dropdown-option-title'>Status</p>
                <div className='dropdown-option-list grid'>
                    {filteredStatusItems}
                </div>
            </div>
            <div className='dropdown-option-container'>
                <p className='dropdown-option-title'>Date Created</p>
                <div className='dropdown-option-list grid-list double'>
                    <div className='dropdown-option stacked'>
                        <label className='filter-label' htmlFor='create-date-start-filter'>From</label>
                        <DayPickerInput
                            onDayChange={handleCreateDateStartDayClick}
                            value={createDate.start && new Date(createDate.start)}
                            placeholder=""

                            dayPickerProps={
                                {
                                    modifiers: {
                                        disabled: {
                                            after: new Date()
                                        },
                                        formatDate: { formatDate },
                                        selected: new Date(createDate.start)

                                    }
                                }}
                            formatDate={formatDate}
                            format={dateFormat}

                        ></DayPickerInput>
                    </div>
                    <div className='dropdown-option stacked'>
                        <label className='filter-label' htmlFor='create-date-end-filter'>To</label>
                        <DayPickerInput
                            onDayChange={handleCreateDateEndDayClick}
                            value={createDate.end && new Date(createDate.end)}
                            placeholder=""
                            dayPickerProps={
                                {
                                    modifiers: {
                                        disabled: {
                                            before: new Date(createDate.start),
                                            after: new Date()
                                        },
                                        selected: new Date(createDate.end)
                                    }
                                }}
                            formatDate={formatDate}
                            format={dateFormat}
                        ></DayPickerInput>
                    </div>
                </div>
            </div>
            <div className='dropdown-option-container '>
                <p className='dropdown-option-title'>Due Date</p>
                <div className='dropdown-option-list grid-list double'>
                    <div className='dropdown-option stacked'>
                        <label className='filter-label' htmlFor='due-date-start-filter'>From</label>
                        {/* <input type='text' id='due-date-start-filter' className='filter-input date' /> */}
                        <DayPickerInput
                            onDayChange={handleDueDateStartDayClick}
                            value={dueDate.start && new Date(dueDate.start)}
                            placeholder=""

                            dayPickerProps={
                                {
                                    modifiers: {
                                        formatDate: { formatDate },
                                        selected: new Date(dueDate.start)

                                    }
                                }}
                            formatDate={formatDate}
                            format={dateFormat}></DayPickerInput>
                    </div>
                    <div className='dropdown-option stacked'>
                        <label className='filter-label' htmlFor='due-date-end-filter'>To</label>
                        <DayPickerInput
                        onDayChange={handleDueDateEndDayClick}
                        value={dueDate.end && new Date(dueDate.end)}
                        placeholder=""
                        dayPickerProps={
                            {
                                modifiers: {
                                    disabled: {
                                        before: new Date(dueDate.start),
                                    },
                                    selected: new Date(dueDate.end)
                                }
                            }}
                        formatDate={formatDate}
                        format={dateFormat}></DayPickerInput>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex-center'>
            <span className='button button-highlight'>Clear filters</span>
        </div>
    </div>
    return (
        <div id='filter'>
            <div onClick={toggleDropdown} className="button button-hollow mid flex-space-around" id='filter'>
                <span>Filter</span>
                <img alt="filter" src="https://d1c99iomjiepbv.cloudfront.net/public/images/filterlist.svg" />
            </div>
            {dropdownShowing && dropdown}

        </div>
    )
}

export default FilterDropdown
