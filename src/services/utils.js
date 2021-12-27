export const sanitizeInput = (dirtyString)=>{
    // TODO I guess I should just sanitize stuff here
    if(dirtyString && dirtyString.length > 0){
        return dirtyString.trim()

    }
}

const getTimeDiffString = (timeDiff) =>{
    // TODO this can be done with just the millisecods I think, but I can't wrap my brain around it atm.
    const seconds = timeDiff/1000
    if(seconds < 60){
        return "less than a minute ago"
    }
    const minutes = Math.floor(seconds / 60)
    if(minutes < 60){
        return minutes == 1 ? "about a minute ago" : minutes  + " minutes ago"
    }

    const hours = Math.floor(minutes/60)
    if(hours < 24){
        return hours == 1 ? " about 1 hour ago" : hours + " hours ago"
    }

    const days = Math.floor(hours/ 24)
    if(days < 7){
        return days == 1 ? "about 1 day ago" : days + " days ago"
    }
    const weeks = Math.floor(days / 7)
    if(days < 30){
        return weeks == 1 ? " about 1 week ago" : weeks + " weeks ago"
    }

    const months = Math.floor( days / 30)
    if(months < 12){
        return months == 1 ? " about 1 month ago" : months + " months ago"
    }

    const years = Math.floor(months / 12)
    return years == 1 ? "1 year ago" : years + " years ago"

    
}

export const getInterval = (dateObj) =>{
    // TODO MDN says parsing dates with the date constructor strongly discouraged. Why does the behavior change by browser? Do they all use different JS engines? Why are the JS engines allowed to handle dates differently? 
    const currentDateObj = new Date()
    return  getTimeDiffString(currentDateObj - new Date(dateObj))
    
}