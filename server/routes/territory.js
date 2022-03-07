import express from 'express';
import controller from '../controllers/territory.js';

const router = express.Router();

router.post('/', controller.postTerritory);
router.put('/', controller.putTerritory);

router.get('/map', controller.getMap);

router.get('/:id', controller.getTerritoryById);
router.patch('/:id.:field', controller.patchTerritory);

router.get('/search=:name', controller.findTerritory);

export default router;