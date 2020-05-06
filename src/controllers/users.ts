import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

import * as dotenv from 'dotenv';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY;

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
    const salt = bcrypt.genSaltSync(SALT_ROUND);
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

  if (!user) {
    res.status(400).send({ message: 'Invalid email or password' });
  } else {
    const isSuccess = bcrypt.compareSync(password, user.password);

    if (isSuccess) {
      const payload = {
        id: user.id,
        name: user.name
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    }
  }
};
