const user = require('./db.js');

async function routesUser(fastify, options) {
  fastify.post('/createUser', async (request, reply) => {
    if (!request.body) return reply.sendStatus(400);
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    const userBalance = request.body.balance;
    await user.create({
      email: userEmail,
      password: userPassword,
      balance: userBalance,
    });
  });

  fastify.post('/UpCash', async (request, reply) => {
    if (!request.body) return reply.sendStatus(400);
    const userBalance = request.body.balance;
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    await user.increment('balance', { by: userBalance, where: { email: userEmail, password: userPassword } });
  });

  fastify.post('/DownCash', async (request, reply) => {
    if (!request.body) return reply.sendStatus(400);
    const userBalance = request.body.balance;
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    await user.decrement('balance', { by: userBalance, where: { email: userEmail, password: userPassword } });
  });
}

module.exports = { routesUser };
