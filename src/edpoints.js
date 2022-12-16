const user = require('./db.js');

async function routesUser(fastify, options) {
  fastify.post('/createUser', async (request, reply) => {
    if (!request.body) return reply.sendStatus(400);
    try {
      const userEmail = request.body.email;
      const userPassword = request.body.password;
      const userBalance = request.body.balance;
      await user.create({
        email: userEmail,
        password: userPassword,
        balance: userBalance,
      });
      return 'Пользователь создан: ' + `${userEmail}`;
    } catch (error) {
      throw new Error('Ошибка создания пользователя');
    }
  });

  fastify.post('/UpCash', async (request, reply) => {
    if (!request.body) return reply.sendStatus(400);
    try {
      const userBalance = request.body.balance;
      const userEmail = request.body.email;
      const userPassword = request.body.password;
      await user.increment('balance', { by: userBalance, where: { email: userEmail, password: userPassword } });
      return 'Баланс пользователя ' + `${userEmail}` + ' пополнен на сумму: ' + `${userBalance}`;
    } catch (error) {
      throw new Error('Ошибка пополнения баланса');
    }
  });

  fastify.post('/DownCash', async (request, reply) => {
    if (!request.body) return reply.sendStatus(400);
    const userBalance = request.body.balance;
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    const client = await user.findOne({ where: { email: request.body.email, password: request.body.password } });
    if (!client) {
      throw new Error('Пользователь не найден');
    } else if (client.balance - userBalance >= 0) {
      return await client.decrement({ balance: userBalance }, { where: { email: userEmail, password: userPassword } });
    } else {
      throw new Error('На вашем балансе недостаточно средств');
    }
  });
}
module.exports = { routesUser };
