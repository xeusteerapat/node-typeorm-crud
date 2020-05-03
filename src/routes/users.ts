import * as express from 'express';
import { Router, Request, Response } from 'express';
import { createUser, getAllUsers } from '../controllers/users';
const router: Router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);

router.get('/:id', (req: Request, res: Response) => {});
router.put('/:id', (req: Request, res: Response) => {});
router.delete('/:id', (req: Request, res: Response) => {});

export default router;
