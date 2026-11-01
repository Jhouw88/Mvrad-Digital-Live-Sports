const ADDON_DOMAIN = 'localhost:8000';
const INSTALL_LINK = `stremio://${ADDON_DOMAIN}/manifest.json`;

document.getElementById('install-link').setAttribute('href', INSTALL_LINK);
