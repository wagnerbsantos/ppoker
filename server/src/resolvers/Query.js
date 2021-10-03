async function roomList(parent, args, context, info) {
  const where = args.filter ? {} : {};

  const result = await context.prisma.room.findMany({
    where,
  });

  return result;
}

async function userList(parent, args, context, info) {
  const where = args.filter ? {} : {};

  const result = await context.prisma.user.findMany({
    where,
  });

  return result;
}

async function topicMedia(parent, args, context, info) {
  const where = args.filter
    ? { topicId: { equals: Number(args.topicId) } }
    : {};

  const topic = await context.prisma.topic.findUnique({
    where: {
      id: Number(args.topicId),
    },
  });

  const result = await context.prisma.vote.findMany({
    where,
  });

  let soma = 0;
  result.forEach((element) => {
    soma = element.score + soma;
  });
  const count = await context.prisma.vote.count({ where });

  return {
    id: topic.id,
    name: topic.name,
    room: topic.room,
    media: soma / count,
  };
}

module.exports = {
  topicMedia,
  roomList,
  userList,
};
