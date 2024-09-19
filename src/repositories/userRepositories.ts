import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const findAll = () => {
  return prisma.user.findMany();
};

export default { findAll };
