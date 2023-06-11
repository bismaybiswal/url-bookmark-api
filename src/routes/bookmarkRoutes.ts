// userRoutes.ts
import { Router } from 'express';
import { addBookmark, deleteBookmark, listBookmark, getBookmark } from '../controller/bookmarkController';

const router = Router();

router.post('/add', addBookmark);
router.delete('/delete', deleteBookmark);
router.get('/', listBookmark);
router.get('/getbookmark', getBookmark)


export default router;
