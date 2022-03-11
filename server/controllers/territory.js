import service from '../services/territory.js';

const error = (res, err, status) => {
    res.status(status || 400).send(`Error: ${err.message}`);
    console.error(err);
};
/*
const controller = {

    post: async (req, res) => {
        const body = req.body;
        if (await Territory.exists({ name: body.name })) { res.status(405).send(`Territory ${body.name} already exists. Use PUT or PATCH instead to update.`); return; }
        const doc = new Territory({
            name: body.name,
            gameLink: body.gameLink
        });
    
        try {
            const doc = await doc.save();
            res.status(201);
            res.send({ "success": true, "doc": doc });
        } catch (err) {
            res.status(400);
            res.send(err);
        }
    },

    put: async (req, res) => {
        const body = req.body;
        if (!body.name) { res.status(400).send('Name is undefined'); return; }

        try {
            if (await Territory.exists({ 'name': body.name })) {
                const doc = await Territory.findOneAndReplace({ 'name': body.name }, {
                    'name': body.name,
                    'gameLink': body.gameLink
                });
                res.status(201);
                res.send(doc);
            } else {
                const doc = new Territory({ name, gameLink } = body);
                const doc = await doc.save();
                res.status(201);
                res.send(doc);
            }
        } catch (err) {
            error(res, err)
        }
    },

    map: {
        get: async (_req, res) => {
            const docs = await Territory.find().select('name');
            res.send({ docs });
        }
    },

    id: {
        get: async (req, res) => {
            const id = req.params.id;
            try {
                const doc = await Territory.findById(id);
                res.send({ doc });
            } catch (err) {
                error(res, err, 404);
            }
        },
        patch: async (req, res) => {
            const id = req.params.id;
            const field = req.params.field;
            try {
                const doc = await Territory.findOneAndUpdate(id, req.body);
                res.status(201);
                res.send(doc);
            } catch (err) {
                error(res, err);
            }
        }
    }
    
}
*/

const controller = {};

controller.getMap = async (_req, res) => {
    const docs = await service.getMap();
    res.send(docs);
};

controller.getTerritoryById = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await service.getTerritoryById(id);
        res.send({ doc });
    } catch (e) {
        error(res, e, 404);
    }
};

controller.findTerritory = async (req, res) => {
    const search = req.params.name;
    try {
        const doc = await service.findTerritory(search, true);
        res.send({ doc });
    } catch (e) {
        error(res, e, 404);
    }
};

controller.postTerritory = async (req, res) => {
    const body = req.body;
    try {
        if (await service.findTerritory(body.name)) { res.status(405).send(`Territory ${body.name} already exists. Use PUT or PATCH instead to update.`); return; }
        const doc = await service.newTerritory(body);
        res.status(201);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
};

controller.putTerritory = async (req, res) => {
    const body = req.body;
    if (!body.name) { res.status(400).send('Name is undefined'); return; }
    try {
        const doc = await service.replaceTerritory(body);
        res.status(201);
        res.send({ doc });
    } catch (e) {
        error(res, e);
    }
};

controller.patchTerritory = async (req, res) => {
    const id = req.params.id;
    const field = req.params.field;
    const body = req.body;
    try {
        const doc = await service.updateTerritory(id, field, body);
        res.send({ doc });
    } catch (e) {
        error(res, e)
    }
};


export default controller;