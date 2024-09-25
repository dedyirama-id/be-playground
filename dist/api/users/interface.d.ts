import { type UserInterface } from '../../interface/UserInterface';
export interface UserServiceInterface {
    addUser: (data: {
        name: string;
        email: string;
    }) => Promise<UserInterface>;
}
