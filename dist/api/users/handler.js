"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    constructor(service) {
        this.service = service;
        this.postUserHandler = async (req, res) => {
            const { name, email } = req.body;
            const user = await this.service.addUser({ name, email });
            return res.status(201).json({
                status: 'success',
                message: 'user created successfully',
                data: {
                    id: user.id
                }
            });
        };
    }
}
exports.Handler = Handler;
//# sourceMappingURL=handler.js.map