const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const manifest = require('./manifest');
const sources = require('./sources.json');
const { getSourceById, getCatalogItems } = require('./providers');

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../website/assets')));

app.get('/manifest.json', (_req, res) => {
  const addonManifest = {
    ...manifest,
    id: process.env.ADDON_ID || manifest.id,
    behaviorHints: {
      configurable: true,
      configurationRequired: false,
    },
  };

  res.setHeader('Content-Type', 'application/json');
  res.json(addonManifest);
});

app.get('/catalog/:type/:id', (req, res) => {
  const { type, id } = req.params;

  if (type !== 'channel' && type !== 'movie') {
    return res.status(400).json({ error: 'Unsupported catalog type' });
  }

  const items = getCatalogItems();
  const metas = items.map((source) => ({
    id: source.id,
    type: 'channel',
    name: source.name,
    description: source.description,
    genres: ['Sports'],
    logo: `${baseUrl}/assets/logo.svg`,
    poster: `${baseUrl}/assets/logo.svg`,
    background: `${baseUrl}/assets/logo.svg`,
    released: '2025',
    videos: [],
    country: source.country,
    language: source.language,
  }));

  res.json({ metas, id, type });
});

app.get('/meta/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const source = getSourceById(id);

  if (!source) {
    return res.status(404).json({ error: 'Source not found' });
  }

  const meta = {
    id: source.id,
    type: 'channel',
    name: source.name,
    description: source.description,
    genres: ['Sports'],
    logo: `${baseUrl}/assets/logo.svg`,
    poster: `${baseUrl}/assets/logo.svg`,
    background: `${baseUrl}/assets/logo.svg`,
    country: source.country,
    language: source.language,
    sources: [
      {
        name: source.name,
        url: source.url,
        type: 'url',
        external: !!source.externalUrl,
      },
    ],
  };

  res.json({ meta, type, id });
});

app.get('/stream/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const source = getSourceById(id);

  if (!source) {
    return res.status(404).json({ error: 'Stream source not found' });
  }

  const stream = {
    name: source.name,
    title: source.name,
    url: source.url,
    type: 'url',
    external: !!source.externalUrl,
  };

  res.json({ streams: [stream], type, id });
});

app.get('/', (_req, res) => {
  res.redirect('/manifest.json');
});

app.listen(port, () => {
  console.log(`Mvrad Digital Live Sports addon running on http://localhost:${port}`);
  console.log(`Manifest: ${baseUrl}/manifest.json`);
});
