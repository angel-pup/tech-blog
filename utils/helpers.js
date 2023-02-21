module.exports = {
  dateTimeFormat: (date) => {
    return (new Date(date).toLocaleString('en-US')); 
  },
  dateFormat: (date) => {
    return (new Date(date).toLocaleDateString('en-US')); 
  },
  timeFormat: (date) => {
    return (new Date(date).toLocaleTimeString('en-US')); 
  },
  isEmpty: (array, options) => {
    if(!Array.isArray(array) || !array.length)
      return options.fn(this);
    return options.inverse(this);
  }
};