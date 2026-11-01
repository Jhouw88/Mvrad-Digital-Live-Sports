module.exports = {
  id: 'com.mvrad.digital.sports',
  version: '1.0.0',
  name: 'Mvrad Digital Live Sports',
  description: 'Official free live sports streams in one Stremio catalog.',
  catalogs: [
    {
      type: 'channel',
      id: 'sports',
      name: 'Live Sports',
      extra: [{ name: 'search' }],
    },
  ],
  resources: ['catalog', 'meta', 'stream'],
  types: ['channel'],
  idPrefixes: ['channel'],
  behaviorHints: {
    configurable: true,
    configurationRequired: false,
  },
};
