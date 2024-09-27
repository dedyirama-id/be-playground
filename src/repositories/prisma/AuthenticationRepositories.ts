import { PrismaClient, type Authentication } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { InvariantError } from '../../exceptions/InvariantError';

export class AuthenticationRepositories {
  readonly prisma: PrismaClient;

  constructor () {
    this.prisma = new PrismaClient();
  }

  async addAuthentication (userId: string, refreshToken: string): Promise<Authentication> {
    const id = `auth-${uuidv4()}`;
    const authentication = await this.prisma.authentication.create({
      data: {
        id,
        userId,
        refreshToken
      }
    });

    return authentication;
  }

  async deleteAuthentication (refreshToken: string): Promise<void> {
    const deletedAuthentication = await this.prisma.authentication.delete({
      where: { refreshToken }
    });

    if (deletedAuthentication === undefined || deletedAuthentication === null) {
      throw new InvariantError('Refresh token not registered');
    }
  }
}
