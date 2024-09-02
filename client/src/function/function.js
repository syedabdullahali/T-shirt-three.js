const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Ensures the time is in 12-hour format with AM/PM
    timeZone: 'UTC'
  };

const formatDateFun = (dateVal)=>{
    const date = new Date(dateVal+"")
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate
}

const functionToCovertIntoBoolean = (val)=>{
return  typeof val === 'string' ? JSON.parse(val) : val 
}



export {formatDateFun,functionToCovertIntoBoolean}

