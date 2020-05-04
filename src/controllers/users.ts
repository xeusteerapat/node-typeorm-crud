import { getRepository } from 'typeorm';
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

export const getUserById = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.find({
    id: Number(req.params.id)
  });

  res.send(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const { name, age, phoneNumber } = req.body;
  const userRepository = getRepository(User);

  await userRepository.update(Number(req.params.id), {
    name,
    age,
    phoneNumber
  });

  const updatedUser = await userRepository.find({
    id: Number(req.params.id)
  });

  res.send(updatedUser);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.find({
    id: Number(req.params.id)
  });

  await userRepository.remove(user);

  res.send(`User id ${req.params.id} has been deleted.`);
};
