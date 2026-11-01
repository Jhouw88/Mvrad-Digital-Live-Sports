const sources = require('../sources.json');

function getEnabledSources() {
  return sources.filter((source) => source.enabled);
}

function getCatalogItems() {
  return getEnabledSources();
}

function getSourceById(id) {
  return getEnabledSources().find((source) => source.id === id) || null;
}

module.exports = {
  getEnabledSources,
  getCatalogItems,
  getSourceById,
};
