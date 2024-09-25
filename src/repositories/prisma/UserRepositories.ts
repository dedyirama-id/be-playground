import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { InvariantError } from '../../exceptions/InvariantError';
import { v4 as uuidv4 } from 'uuid';
import type { UserDto } from '../../types/dto/userDto';
import bcrypt from 'bcrypt';

export class UserRepositories {
  readonly prisma: PrismaClient;

  constructor () {
    this.prisma = new PrismaClient();
  }

  async addUser ({ username, password, email }: { username: string, password: string, email: string }): Promise<UserDto> {
    const user = await this.prisma.users.findFirst({
      where: { email }
    });

    if (user !== null) {
      throw new InvariantError('Email already used');
    }

    const id = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.prisma.users.create({
      data: {
        id,
        username,
        password: hashedPassword,
        email
      }
    });

    return newUser;
  }

  async getUserById (id: string): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({
      where: { id }
    });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async getUserByEmail (email: string): Promise<UserDto> {
    const user = await this.prisma.users.findFirst({
      where: { email }
    });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUserById (id: string, { username, email }: { username?: string, email?: string }): Promise<UserDto> {
    const updatedUser = await this.prisma.users.update({
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

  async deleteUserById (id: string, password: string): Promise<void> {
    await this.verifyUserCredentials(id, password);

    const deletedUser = await this.prisma.users.delete({
      where: { id }
    });

    if (deletedUser === null) {
      throw new InvariantError('Failed to delete user');
    }
  }

  async verifyUserCredentials (id: string, password: string): Promise<void> {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    const userPassword: string = user.password;
    const match: boolean = await bcrypt.compare(password, userPassword);

    if (!match) {
      throw new InvariantError('Invallid Password');
    }
  }
}
