async function createRoom(parent, args, context, info) {
  //Pesquisar pra que serve o parent e o info
  const newRoom = await context.prisma.room.create({
    data: {
      name: args.name,
      password: args.password,
    },
  });
  return newRoom;
}

async function createTopic(parent, args, context, info) {
  //Pesquisar pra que serve o parent e o info
  const newTopic = await context.prisma.topic.create({
    data: {
      name: args.name,
      room: { connect: { id: Number(args.roomId) } },
    },
  });
  return newTopic;
}

async function vote(parent, args, context, info) {
  const vote = await context.prisma.vote.findUnique({
    where: {
      userId_topicId: {
        topicId: Number(args.topicId),
        userId: Number(args.userId),
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Já votou nesse topico: ${args.topicId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: Number(args.userId) } },
      topic: { connect: { id: Number(args.topicId) } },
      score: args.score,
    },
  });

  return newVote;
}
async function signup(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: {
      name: args.name,
    },
  });

  if (Boolean(user)) {
    throw new Error(`Usuário já existe: ${args.name}`);
  }

  const newUser = await context.prisma.user.create({
    data: {
      name: args.name,
    },
  });
  return newUser;
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: {
      name: args.name,
    },
  });
  return user;
}

module.exports = {
  createRoom,
  createTopic,
  vote,
  signup,
  login,
};
