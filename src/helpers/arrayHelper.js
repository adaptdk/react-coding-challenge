export default class arrayHelper {

  // immutable variant for removing an item by index instead of using .slice or .splice
  static removeItemAtIndex(array, searchedItem) {
    const foundIndex = array.findIndex(item => item === searchedItem);
    return array.filter((item, itemIndex) => itemIndex !== foundIndex);
  }

}
