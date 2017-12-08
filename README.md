# Example Service for Compoxure: https://github.com/tes/compoxure

```
git clone git@github.com:tes/compoxure-example.git
cd compoxure-example
nvm use
npm i
```

To run the demo:

```
npm run demo
```

Then visit:  http://localhost:7000

## Explanation of files

`proxy.js`: https://github.com/tes/compoxure-example/blob/master/proxy.js

This is the key file that sets up a basic express server, loads configuration, and adds the compoxure middleware to express.  This is the file you will retain.

`config`: https://github.com/tes/compoxure-example/blob/master/config

This is where you store the configuration.  At Tes we keep all of the backend configuration in `default.json`, and only the things that change by environment in the `environment.json`.  This assumes you use `NODE_ENV=production`, if you use a different env variable to indicate your environments conflab supports this (we use TES_ENV).

`demo.js`: https://github.com/tes/compoxure-example/blob/master/demo.js

This just starts the backend and proxy for you to play with.

`backend.js`: https://github.com/tes/compoxure-example/blob/master/backend.js

This serves a super simple backend application (contains a page that has `cx-` markup), and service endpoints (that serves some simple fragments).

## Converting this into a real service to use

To productionise this, I'd do the following:

1.  Clone the repo, rename it.
2.  Delete `demo.js`, `backend.js` and `/static`.  These are purely to show it working.
2.  Bolt in whatever you use to manage config, we use https://github.com/tes/conflab, as it supports simple convention based hierarchical config files.
3.  Wire up your own logger and stats into the proxy.js, including replacing the HTTP logger (morgan) if you use something else.
4.  Add your server and backend configuration.
5.  Profit!

We don't have tests in this repo at Tes, as it contains only configuration and very little actual code.  If you have some complex functions or complex configuration you may make different choices!

## Architecture Patterns

In real world usage we have a few patterns that we use at Tes to keep ourselves sane.

`app-*`: applications

We define an application as a node service that returns HTML and provides a UI of some sort to a user.  e.g. the application that allows authors to upload teaching resources on tes.com.

All of the backend configuration points to apps.  These apps respond with server rendered HTML that contains the `cx-` markup.

`service-*`: services

Fragments of content are rendered by services.  We define the service name and base url in the configuration block for servers, so that they can be re-used in the backend configuration by name, e.g. `{{service:profile}}`.  This means you can have the backend configuration in one place (e.g. in `default.json`), and then have the specific services themselves in each environment file.

If you have a registry of services, you can also call that to get a list, and inject those into the config to save you duplicating config.
