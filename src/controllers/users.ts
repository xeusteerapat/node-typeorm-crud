import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';

export const createUser = async (req: Request, res: Response) => {
  let user = new User();
  user = { ...req.body };

  const userRepository = getRepository(User);

  await userRepository.save(user);
  res.send(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();
  res.send(users);
};
