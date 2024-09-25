"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const NotFoundError_1 = require("../../exceptions/NotFoundError");
const InvariantError_1 = require("../../exceptions/InvariantError");
const uuid_1 = require("uuid");
class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async addUser({ name, email }) {
        const id = (0, uuid_1.v4)();
        const user = await this.prisma.user.create({
            data: {
                id,
                name,
                email
            }
        });
        return user;
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (user === null) {
            throw new NotFoundError_1.NotFoundError('User not found');
        }
        return user;
    }
    async updateUserById(id, { name, email }) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                name,
                email
            }
        });
        if (updatedUser === null) {
            throw new InvariantError_1.InvariantError('Failed to update user');
        }
        return updatedUser;
    }
    async deleteUserById(id) {
        const deletedUser = await this.prisma.user.delete({
            where: { id }
        });
        if (deletedUser === null) {
            throw new InvariantError_1.InvariantError('Failed to delete user');
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map