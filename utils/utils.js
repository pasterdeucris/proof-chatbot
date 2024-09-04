

export function convertTimestampToDate(timestamp) {
    // Convert milliseconds to a Date object
    const date = new Date(timestamp);
    
    // Extract date components
    const year = date.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    
    // Format the date as desired
    return `${day} ${month} ${year}`;
  }
  

  
module.exports = {
  convertTimestampToDate
};