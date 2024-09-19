import { Request, Response } from 'express';
import userService from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};
