'use strict';

const Fs = require('fs');
const Path = require('path');
const express = require('express');
const sdoc = require("swagger-jsdoc");
const sui = require("swagger-ui-express");

const app = express();
const port = process.env.NODE_PORT || 5050;
const serverPath = `http://localhost:${port}`;
const routesPath = './routes';
const apiPath = `${routesPath}/api`;
const apiDocsRoute = '/api-docs';

// --------------------- OpenAPI Docs ---------------------

// see: https://swagger.io/specification/#infoObject
const sdef = sdoc({
  swaggerDefinition: {
    info: {
      title: "Users API",
      description: "Users microservice API",
      contact: {
        name: "Someone"
      },
      servers: [serverPath]
    }
  },
  apis: [`${apiPath}/*.js`]
});

// serve REST docs
app.use(apiDocsRoute, sui.serve, sui.setup(sdef));

// --------------------- OpenAPI ---------------------

(async () => {
  // map all routes in /routes (and sub-dirs)
  for await (const path of files(routesPath)) {
    // each router defines it's own router paths
    app.use('/', require(`./${path}`));
  }

  // startup
  app.listen(port, () => {
    console.log(`Microservice: ${serverPath} REST API Docs: ${serverPath}${apiDocsRoute}`);
  });
})();

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
