import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Player } from '../entity/Player';

export const createPlayer = async (req: Request, res: Response) => {
  let player = new Player();
  player = { ...req.body };

  const playerRepository = getRepository(Player);

  await playerRepository.save(player);
  res.send(player);
};

export const getAllPlayers = async (req: Request, res: Response) => {
  const playerRepository = getRepository(Player);

  const players = await playerRepository.find();
  res.send(players);
};

export const getPlayerById = async (req: Request, res: Response) => {
  const playerRepository = getRepository(Player);

  const player = await playerRepository.find({
    id: Number(req.params.id)
  });

  res.send(player);
};

export const updatePlayerById = async (req: Request, res: Response) => {
  const { name, position } = req.body;
  const playerRepository = getRepository(Player);

  await playerRepository.update(Number(req.params.id), {
    name,
    position
  });

  const updatedPlayer = await playerRepository.find({
    id: Number(req.params.id)
  });

  res.send(updatedPlayer);
};

export const deletePlayerById = async (req: Request, res: Response) => {
  const playerRepository = getRepository(Player);

  const player = await playerRepository.find({
    id: Number(req.params.id)
  });

  await playerRepository.remove(player);

  res.send(`Player id ${req.params.id} has been deleted.`);
};
