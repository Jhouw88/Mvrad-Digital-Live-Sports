async function getExampleLiveStream() {
  return {
    id: 'redbull-live',
    name: 'Red Bull TV',
    url: 'https://example.com/redbull.m3u8',
    externalUrl: true,
  };
}

module.exports = {
  getExampleLiveStream,
};
