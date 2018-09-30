import App from '../common/containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from '../common/store/configureStore';
import express from 'express';
import reactHelmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import serialize from 'serialize-javascript';
import defaultState from '../common/defaultState';
import { addMessage } from '../common/actions/messages';
// import _ from 'lodash';
// import sitemap from 'express-sitemap';
// import { renderToString } from 'react-dom/server';

const ReactCC = require("react-component-caching");
const componentCache = new ReactCC.ComponentCache();
const debug = require('debug')('SSR');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();
const MobileDetect = require('mobile-detect');

// https://realfavicongenerator.net/
const icons = `
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
`


server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  // can remove /api section if not testing
  .get('/*', async (req, res) => {
    const md = new MobileDetect(req.headers['user-agent']);
    let initialPortalWidth = (md.mobile() ? 600 : 1000);

    // turn http://localhost:3000/animal/goat into ['animal', 'goat']
    const routeParams = req.params[0].split('/');

    // Compile an initial state
    // const initialStore = ;

    // Create a new Redux store instance
    const store = configureStore(defaultState);

    store.dispatch(
      addMessage({
        to: 1, // 0 = all, 1 = admins, n = userID
        level: 'info',
        text: `application started`
      })
    );

    // Create the server side style sheet
    const sheet = new ServerStyleSheet();

    // Render the component to a string - with caching
    // const markup = await renderToString(
    const markup = await ReactCC.renderToString(
      <Provider store={store}>
        <App />
      </Provider>,
      componentCache
    );

    // get headers and open-graph
    const helmet = reactHelmet.renderStatic(markup);

    // get css from markup to be placed in initial html
    sheet.collectStyles(markup)

    // Generate all the style tags so they can be rendered into the page
    const styleTags = sheet.getStyleTags();

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    res.send(`<!doctype html>
          <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              ${icons}
              ${assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''}
                ${process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`}
          ${styleTags}
          </head>
          <body>
              <div id="root">${markup}</div>
              <script>
                window.__PRELOADED_STATE__ = ${serialize(finalState)}
              </script>
          </body>
      </html>`);

  }); // end get

export default server;
