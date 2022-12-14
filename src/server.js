const Fastify = require('fastify');
const dbConnector = require('./our-db-connector');
const firstRoute = require('./out-first-route');
const edpoints = require('./edpoints');

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnector);
fastify.register(firstRoute.routesFirst);
fastify.register(edpoints.routesUser);

fastify.listen({ port: 4000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
