import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { InvariantError } from '../../exceptions/InvariantError';
import { v4 as uuidv4 } from 'uuid';
import type { UserDto } from '../../types/dto/userDto';

export class UserRepositories {
  readonly prisma: PrismaClient;

  constructor () {
    this.prisma = new PrismaClient();
  }

  async addUser ({ username, password, email }: { username: string, password: string, email: string }): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    if (user !== null) {
      throw new InvariantError('Email already used');
    }

    const id = uuidv4();
    const newUser = await this.prisma.user.create({
      data: {
        id,
        username,
        password,
        email
      }
    });

    return newUser;
  }

  async getUserById (id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async getUserByEmail (email: string): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUserById (id: string, { username, email }: { username?: string, email?: string }): Promise<UserDto> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username,
        email
      }
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
