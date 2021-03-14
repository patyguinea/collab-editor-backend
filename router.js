const Joi = require('joi');
const consola = require('consola');

const routes = require('./routes/index');

const ALLOWED_METHODS = ['get', 'post', 'delete'];

const ROUTE_OBJECT_SCHEMA = Joi.object({
  path: Joi.string().required().allow(''),
  method: Joi.string()
    .lowercase()
    .required()
    .valid(...ALLOWED_METHODS),
  controller: Joi.func().required(),
  validators: Joi.object({
    params: Joi.object(),
    query: Joi.object(),
    headers: Joi.object(),
    body: Joi.object(),
  }),
  description: Joi.string(),
});

function loadRoutes(router) {
  Object.keys(routes).forEach(routesListName => {
    const routesList = routes[routesListName];
    if (!Array.isArray(routesList) || !routesList.length) {
      consola.info(`${routesListName} doesn't contain any routes.`);
      return;
    }

    routesList.forEach(route => {
      const { error } = ROUTE_OBJECT_SCHEMA.validate(route);
      if (error) {
        consola.error(
          `Route with path ${route.path} $ does not satisfy schema requirements. Details: ${JSON.stringify(error)}`
        );
        return;
      }
      const { method, path, controller } = route;
      router[method.toLowerCase()](path, controller);
    });
  });
}

module.exports = loadRoutes;
