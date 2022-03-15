import service from '../services/war.js';

const error = (res, err, status) => {
    res.status(status || 400).send(`Error: ${err.message}`);
    console.error(err);
};

const controller = {};

controller.getWars = async (_req, res) => {
    const doc = await service.getWars();
    res.send({ doc });
};

controller.getWar = async (req, res) => {
    const doc = await service.getWar(req.params.id);
    res.send({ doc });
};

controller.queryWar = async (req, res) => {
    const doc = await service.queryWar(req.query);
    res.send({ doc });
};

controller.postWar = async (req, res) => {
    const body = req.body;
    try {
        const doc = await service.newWar(body);
        res.status(201).send({ doc });
    } catch (e) {
        error(res, e);
    }
};

controller.patchWar = async (req, res) => {
    const id = req.params.id;
    const field = req.params.field;
    try {
        const doc = await service.updateWar(id, field, req.body.value);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
};


controller.getBattles = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await service.getBattles(id, req.query);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
}

controller.getBattle = async (req, res) => {
    const id = req.params.id;
    const index = req.params.index;
    try {
        const doc = await service.getBattle(id, index);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
}

controller.postBattle = async (req, res) => {
    const body = req.body;
    const warId = req.params.id;
    try {
        const doc = await service.addBattle(body, warId);
        res.status(201).send({ doc });
    } catch (e) {
        error(res, e);
    }
};

controller.patchBattle = async (req, res) => {
    const params = req.params;
    const id  = params.id;
    const index = params.index;
    const field = params.field;
    try {
        const doc = await service.updateBattle(id, index, field, req.body.value);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
};

controller.declareBattleVictor = async (req, res) => {
    const params = req.params;
    const id = params.id;
    const index = params.index;
    try {
        await service.updateBattle(id, index, 'ongoing', false);
        const doc = await service.updateBattle(id, index, 'victory', req.body.value);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
};


export default controller;