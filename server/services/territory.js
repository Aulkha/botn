import Territory from "../models/Territory.js";

const getMap = async () => {
    return await Territory.find().select('name').exec();
};

const findTerritory = async (name, useRegex) => {
    const regex = name;
    if (useRegex) { regex = RegExp(name, 'i') }
    return await Territory.find({ name: regex }).exec();
};

const getTerritoryById = async (id) => {
    return await Territory.findById(id).exec();
};

const newTerritory = async (body) => {
    const doc = new Territory(body);
    const savedDoc = await doc.save();
    
    return savedDoc;
};

const replaceTerritory = async (body) => {
    if (await Territory.exists({ 'name': body.name })) {
        const doc = await Territory.findOneAndReplace({ 'name': body.name }, body);
        return doc;
    } else {
        return false;
    }
};

const updateTerritory = async (id, field, body) => {
    const doc = await Territory.findByIdAndUpdate(id, { [field]: body.value }).exec();
    return doc;
};

export default { getMap, findTerritory, getTerritoryById, newTerritory, replaceTerritory, updateTerritory };