'use strict';

const Fs = require('fs');
const Path = require('path');
const { promisify } = require('util');

const express = require('express');
const app = express();
const { ValidationError } = require('express-validation');
const sjsdocx = require("swagger-jsdoc");
const sui = require("swagger-ui-express");

const YAML = require('yamljs');
const sdoc = YAML.load('./resources/openapi.yml');

const host = process.env.NODE_HOST || 'localhost';
const port = process.env.NODE_PORT || 5050;
const serverSpec = {
  url: `http://${host}:${port}`,
  description: 'Default server'
};
const routesPath = './routes';
const apiPath = `${routesPath}/api`;
const apiDocsRoute = '/api-docs';

// add the server
if (sdoc.servers) sdoc.servers.unshift(serverSpec);
else sdoc.servers = [serverSpec];

//const bodyParser = require('body-parser');
//app.use(bodyParser.json());

// --------------------- OpenAPI Docs ---------------------

const sjsdoc = sjsdocx({
  swaggerDefinition: sdoc,
  apis: [`${apiPath}/*.js`]
});

// serve REST docs
app.use(apiDocsRoute, sui.serve, sui.setup(sjsdoc, { explorer: true }));

// --------------------- Validation ---------------------

// app.use(function(err, req, res, next) {
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json(err);
//   }
//   return res.status(500).json(err);
// });

// --------------------- Application ---------------------

(async () => {
  // map all routes in /routes (and sub-dirs)
  for await (const path of files(routesPath)) {
    // each router defines it's own router paths
    app.use('/', require(`./${path}`));
  }

  // startup
  await promisify(app.listen).bind(app)(port);

  console.log(`Microservice: ${serverSpec.url} REST API Docs: ${serverSpec.url}${apiDocsRoute}`);
})();

// --------------------- Utilities ---------------------

/**
 * Generates a set of file paths by recursively traversing the given directory
 * @param {String} dir The directory to traverse
 * @param {Boolean} join Truthy to use `path.join` vs the _default_ concatination
 * @yields {String} The next file path in the traversal
 */
async function* files(dir, join) {
  for await (const sdir of await Fs.promises.opendir(dir)) {
    const loc = join ? Path.join(dir, sdir.name) : `${dir}/${sdir.name}`;
    if (sdir.isDirectory()) yield* files(loc);
    else if (sdir.isFile()) yield loc;
  }
}
