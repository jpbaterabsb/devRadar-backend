module.exports = function(stringAsArray) {
  return stringAsArray.split(",").map(t => t.trim());
}