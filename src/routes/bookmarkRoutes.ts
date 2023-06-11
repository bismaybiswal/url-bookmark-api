// userRoutes.ts
import { Router } from 'express';
import { addBookmark } from '../controller/bookmarkController';

const router = Router();

router.post('/add', addBookmark);


export default router;
