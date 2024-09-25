import { PrismaClient } from '@prisma/client';
import { type UserInterface } from '../../interface/UserInterface';
export declare class UserService {
    readonly prisma: PrismaClient;
    constructor();
    addUser({ name, email }: {
        name: string;
        email: string;
    }): Promise<UserInterface>;
    getUserById(id: string): Promise<UserInterface>;
    updateUserById(id: string, { name, email }: {
        name?: string;
        email?: string;
    }): Promise<UserInterface>;
    deleteUserById(id: string): Promise<void>;
}
