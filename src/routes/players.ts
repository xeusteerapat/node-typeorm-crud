import * as express from 'express';
import { Router } from 'express';
import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayerById,
  deletePlayerById
} from '../controllers/players';

const router: Router = express.Router();

router.get('/', getAllPlayers);
router.post('/', createPlayer);

router.get('/:id', getPlayerById);
router.put('/:id', updatePlayerById);
router.delete('/:id', deletePlayerById);

export default router;
