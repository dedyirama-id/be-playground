"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = require("./handler");
const userService_1 = require("../../services/prisma/userService");
const router = (0, express_1.Router)();
const userService = new userService_1.UserService();
const handler = new handler_1.Handler(userService);
router.post('/', handler.postUserHandler);
exports.default = router;
//# sourceMappingURL=router.js.map