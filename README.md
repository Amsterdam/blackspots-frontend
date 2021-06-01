# Blackspots/WBA Kaart

[![Netlify Status](https://api.netlify.com/api/v1/badges/3b93497f-fa26-41a0-8de8-470d8f685e0c/deploy-status)](https://app.netlify.com/sites/blackspots-frontend/deploys)

## Keypoints

- [SPA](https://nl.wikipedia.org/wiki/Single_Page_Application)
- Based on [CRA](https://facebook.github.io/create-react-app/)
- Uses SCSS for CSS processing
- Uses CSS Modules for style composition
- Communicates with REST API
- Uses Keycloak to authenticate users

## Requirements

- [NPM](https://www.npmjs.com/)

## Installation

use node 10

```bash
  npm install
```

## Copy the acc environment for local development

```
  cp .env.acc .env
```

## Development

- configure the environment variables in the .env file, examples can be found in .env.dev, .env.acc en .env.prod

```bash
  npm start
```

For development a dyson server can be used

- Open <http://localhost:3000>

## Testing

```bash
  npm run test
```
