import express from 'express';
import controller from '../controllers/nation.js';

const router = express.Router();

router.get('/', controller.getNations);
router.post('/', controller.postNation);

router.get('/:id', controller.getOneNation);
router.patch('/:id.:field', controller.patchNation);

router.get('/:id/territories', controller.getNationTerritories);

router.get('/:id/wars', controller.getNationWars);

export default router;