module.exports = function cleanName(name) {
  return name.toLowerCase().split(",")[0].trim();
};
