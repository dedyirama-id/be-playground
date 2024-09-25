"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const router_1 = __importDefault(require("./router"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.use('/users', router_1.default);
//# sourceMappingURL=index.js.map