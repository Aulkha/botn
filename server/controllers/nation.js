import service from "../services/nation.js";

const error = (res, err, status) => {
    res.status(status || 400).send(`Error: ${err.message}`);
    console.error(err);
};

const controller = {};

controller.getNations = async (_req, res) => {
    const doc = await service.getNations();
    res.send({ doc });
};

controller.getOneNation = async (req, res) => {
    const doc = await service.getNation(req.params.id);
    res.send({ doc });
};

controller.getNationTerritories = async (req, res) => {
    const doc = await service.getNationTerritories(req.params.id);
    res.send({ doc });
};

controller.getNationWars = async (req, res) => {
    const doc = await service.getNationWars(req.params.id, req.query.alignment);
    res.send({ doc });
};

controller.postNation = async (req, res) => {
    const body = req.body;
    try {
        //if (await service.findNation(body.name)) { res.status(405).send(`Nation ${body.name} already exists. Use PUT or PATCH instead to update.`); return; }
        const doc = await service.newNation(body);
        res.status(201);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
};

controller.patchNation = async (req, res) => {
    const id = req.params.id;
    const field = req.params.field;
    const body = req.body;
    try {
        const doc = await service.updateNation(id, field, body);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
};


export default controller;