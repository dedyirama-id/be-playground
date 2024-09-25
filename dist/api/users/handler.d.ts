import { type Request, type Response } from 'express';
import { type UserServiceInterface } from './interface';
export declare class Handler {
    private readonly service;
    constructor(service: UserServiceInterface);
    postUserHandler: (req: Request, res: Response) => Promise<Response>;
}
