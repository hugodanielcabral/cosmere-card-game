import express from 'express';
import { getCardDefinition, getCardDefinitions } from '../controllers/cardDefinitions.controller';

const router = express.Router();

router.get('/card-definitions', getCardDefinitions);
router.get('/card-definitions/:id', getCardDefinition);



export default router;
