// userRoutes.ts
import { Router } from 'express';
import { addBookmark, deleteBookmark, listBookmark } from '../controller/bookmarkController';

const router = Router();

router.post('/add', addBookmark);
router.delete('/delete', deleteBookmark);
router.get('/', listBookmark);


export default router;
