import { InvariantError } from '../../exceptions/InvariantError';
import type { AuthenticationRepositories, UserRepositories } from './interface';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { NotFoundError } from '../../exceptions/NotFoundError';

export class UserUseCase {
  constructor (private readonly userRepositories: UserRepositories, private readonly authenticationRepositories: AuthenticationRepositories) { }

  async registerNewUser ({ username, password, email }: PostUserDomain): Promise<UserDto> {
    const user = await this.userRepositories.getUserByEmail(email)
      .catch((error) => {
        if (!(error instanceof NotFoundError)) {
          throw (error);
        }
      });

    if (user !== null && user !== undefined) {
      throw new InvariantError('Email already used');
    }

    const id = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.userRepositories.addUser({
      id,
      username,
      hashedPassword,
      email
    });

    return newUser;
  }

  async getUserById (id: string): Promise<UserDto> {
    const user = await this.userRepositories.getUserById(id);
    return user;
  }

  async getUserByEmail (email: string): Promise<UserDto> {
    const user = await this.userRepositories.getUserByEmail(email);
    return user;
  }

  async searchUserByEmail (email: string): Promise<UserDto | null> {
    const user = await this.userRepositories.searchUserByEmail(email);
    return user;
  }

  async updateUserById (id: string, newData: PostUserDomain): Promise<UserDto> {
    const user = await this.userRepositories.getUserById(id);
    const newUserData = {
      ...user,
      ...newData
    };

    const updatedUser = await this.userRepositories.updateUserById(id, newUserData);
    return updatedUser;
  }

  async deleteUserById (id: string, password: string): Promise<void> {
    await this.verifyUserCredentials(id, password);

    await this.userRepositories.deleteUserById(id);
  }

  async verifyUserCredentials (id: string, password: string): Promise<void> {
    const user = await this.userRepositories.getUserById(id);

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    const userPassword: string = user.password;
    const match: boolean = await bcrypt.compare(password, userPassword);

    if (!match) {
      throw new InvariantError('Invallid Password');
    }
  }

  async updateUserGoogleConnection (id: string, googleRefreshToken: string): Promise<void> {
    const user = await this.userRepositories.getUserById(id);
    const newUserData = {
      ...user,
      googleToken: googleRefreshToken
    };

    await this.userRepositories.updateUserById(id, newUserData);
  }
}
