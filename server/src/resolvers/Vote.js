function topic(parent, args, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).topic();
}

function user(parent, args, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
}

module.exports = {
  topic,
  user,
};
