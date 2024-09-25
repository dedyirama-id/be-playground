"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ClientError_1 = require("../exceptions/ClientError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof ClientError_1.ClientError) {
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message
        });
    }
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map