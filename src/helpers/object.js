import _ from "lodash";

function setValueByPath(obj, path, value) {
  let newObj = _.cloneDeep(obj);
  _.set(newObj, path, value);

  return newObj;
}

function clean(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => newObj[key] == "" && delete newObj[key]);
  return newObj;
}

export default {
  setValueByPath,
  clean,
};
