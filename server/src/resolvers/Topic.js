function room(parent, args, context) {
  return context.prisma.topic.findUnique({ where: { id: parent.id } }).room();
}
module.exports = {
  room,
};
