import express from "express";
import controller from "../controllers/war.js";

const router = express.Router();

router.get('/', controller.getWars);
router.post('/', controller.postWar);

router.get('/query', controller.queryWar);

router.get('/:id', controller.getWar);
router.patch('/:id.:field', controller.patchWar);

router.get('/:id/battles', controller.getBattles);
router.post('/:id/battles', controller.postBattle);
router.patch('/:id/battles/:index.:field', controller.patchBattle);

export default router;