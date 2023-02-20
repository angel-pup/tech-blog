module.exports = {
  dateTimeFormat: (date) => {
    return (new Date(date).toLocaleString('en-US')); 
  },
  dateFormat: (date) => {
    return (new Date(date).toLocaleDateString('en-US')); 
  },
  timeFormat: (date) => {
    return (new Date(date).toLocaleTimeString('en-US')); 
  }
};