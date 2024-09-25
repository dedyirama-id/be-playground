"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./api/users");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', users_1.userRouter);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map