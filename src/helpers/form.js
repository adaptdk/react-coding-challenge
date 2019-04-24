// Get group name of array from input name
export const getArrayGroup = name => name.substr(0, name.indexOf('_'));

// Get element index in array from input name
export const getArrayIndex = name => name.substr(name.indexOf('_') + 1, name.length);
