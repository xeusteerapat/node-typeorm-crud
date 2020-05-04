import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userRepository = getRepository(User);
  const existingUser = await userRepository.findOne({
    email
  });

  if (existingUser) {
    res.status(400).send({
      message: 'Email already taken'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await userRepository.create({
      name,
      email,
      password: hashPassword
    });

    await userRepository.save(user);

    res.send({ message: 'User created' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    email
  });

  const isSuccess: boolean = bcrypt.compareSync(password, user.password);

  if (!user || !isSuccess) {
    res.status(401).send({ message: 'Username or password is wrong' });
  } else {
    const payload = {
      id: user.id
    };

    const token = jwt.sign(payload, 'fsdfsdfearterd', { expiresIn: 3600 });

    res.status(200).send({ token });
  }
};
