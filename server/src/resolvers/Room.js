function topics(parent, args, context) {
  return context.prisma.room.findUnique({ where: { id: parent.id } }).topics();
}
module.exports = {
  topics,
};

//Resolver da classe room, resolve os topicos fazendo uma query em room e pegando os topics
