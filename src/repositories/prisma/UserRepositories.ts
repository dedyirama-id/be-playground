import { PrismaClient, type User } from '@prisma/client';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { InvariantError } from '../../exceptions/InvariantError';

export class UserRepositories {
  readonly prisma: PrismaClient;

  constructor () {
    this.prisma = new PrismaClient();
  }

  async addUser ({ id, username, hashedPassword, email }: UserRepoDomain): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        id,
        username,
        password: hashedPassword,
        email
      }
    });

    return newUser;
  }

  async getUserById (id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async getUserByEmail (email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async searchUserByEmail (email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    return user;
  }

  async updateUserById (id: string, newData: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: newData
    });

    if (updatedUser === null) {
      throw new InvariantError('Failed to update user');
    }

    return updatedUser;
  }

  async deleteUserById (id: string): Promise<void> {
    const deletedUser = await this.prisma.user.delete({
      where: { id }
    });

    if (deletedUser === null) {
      throw new InvariantError('Failed to delete user');
    }
  }
}
