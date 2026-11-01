<div align="center">

<img src="website/assets/logo.svg" width="76" alt="Mvrad Digital">

# Mvrad Digital Live Sports

**Stremio addon** — brings together officially free live sports streams in one place.
The interface is in English.

[![Install](https://img.shields.io/badge/⬇_STREMIO--ADDON_INSTALL-A8E832?style=for-the-badge&logoColor=041209&labelColor=041209)](https://YOUR-ADDON-DOMAIN/)
&nbsp;
[![Website](https://img.shields.io/badge/Website-22D3EE?style=for-the-badge&labelColor=041209)](https://YOUR-ADDON-DOMAIN/)

![Node](https://img.shields.io/badge/Node-18%2B-3B82F6?style=flat-square&labelColor=0A1120)
![Stremio](https://img.shields.io/badge/Stremio-Addon_SDK-7C3AED?style=flat-square&labelColor=0A1120)
![License](https://img.shields.io/badge/License-MIT-A8E832?style=flat-square&labelColor=0A1120)

</div>

---

## What is this?

A sports addon for Stremio. It collects official sources published freely by the rights holder into a single catalog in Stremio's `Discover` section — CBC Sport, Sports TV, FIFA+, UEFA.tv, Red Bull TV.

The interface and catalog names are in English. The site supports AZ / EN / RU.

> **Legal note.** This addon does not store, encode, or redistribute any streams. Paid or exclusive protected broadcasts (Champions League, La Liga, UFC, Formula 1, etc.) are **not included and will not be added.**

---

## Structure

```
.
├── addon/                  Node.js Stremio addon
│   ├── server.js           catalog / meta / stream handlers
│   └── src/
│       ├── manifest.js     catalog names and categories
│       ├── sources.json    ← add permitted sources here
│       └── providers/      modular providers
│           ├── index.js    registry + cache
│           ├── manual.js   reads sources.json
│           └── redbull.js  example live API
│
└── website/                static site (Cloudflare Pages)
    ├── index.html
    ├── styles.css
    ├── i18n.js             AZ / EN / RU translations
    ├── app.js              ← change ADDON_DOMAIN here
    └── assets/logo.svg
```

---

## Run the addon

Node.js 18+ is required.

```bash
cd addon
cp .env.example .env
npm install
npm start
```

Manifest: `http://127.0.0.1:7000/manifest.json`

To test locally in Stremio, add this link:
`stremio://127.0.0.1:7000/manifest.json`

---

## Add a source

Open the file `addon/src/sources.json` and add a new entry to the list:

```json
{
  "id": "channel-name",
  "name": "Channel name",
  "category": "football",
  "description": "Short description",
  "country": "AZ",
  "language": "az",
  "url": "https://.../stream.m3u8",
  "externalUrl": false,
  "enabled": true
}
```

`category` must be one of:
`football` · `basketball` · `motorsport` · `wrestling` · `extreme` · `archive`

If you set `externalUrl: true`, Stremio opens the link in the browser instead of loading it directly — this is the safest option for official websites.

**Only add sources you are authorized to publish.**

---

## Configure the website

Change the first line in `website/app.js`:

```js
const ADDON_DOMAIN = "sports.mvraddigital.com";   // no protocol, no trailing slash
```

The install button will automatically generate this link:
`stremio://sports.mvraddigital.com/manifest.json`

If Stremio is not installed, the button redirects to `web.stremio.com`.

Also replace the two badge links in this README with your own domain (`YOUR-ADDON-DOMAIN`).

---

## Deployment

| Section | Where |
|---|---|
| `website/` | Cloudflare Pages — no build command, output directory: `website` |
| `addon/` | Node hosting (Railway, Render, Fly.io, VPS) |

It is recommended to place the addon domain behind Cloudflare.

For Cloudflare Pages: connect the repo, **Framework preset: None**,
**Build output directory: `website`**.

---

## License

MIT — see [LICENSE](LICENSE).

All brand names and broadcasting rights belong to their respective owners.
