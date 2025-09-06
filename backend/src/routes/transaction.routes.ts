import Router from 'express'
import { getTransaction, addTransaction,updateTransaction,deleteTransaction } from '../controllers/transaction.controller.js'
import { authenticateUser } from '../middleware/auth.middleware.js'

const router = Router();

// Apply the authentication middleware to all transaction routes
router.use(authenticateUser);

router.get('/', getTransaction);
router.post('/add', addTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;