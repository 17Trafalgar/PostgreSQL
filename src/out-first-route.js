async function routesFirst(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'Сервер запущен' };
  });
}
module.exports = { routesFirst };
