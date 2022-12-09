async function routesFirst(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'Artem' };
  });
}
module.exports = { routesFirst };
