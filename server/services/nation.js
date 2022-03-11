import Nation from "../models/Nation.js";

const getNations = async () => {
    return await Nation.find().exec();
};

const getNation = async (id) => {
    const doc = await Nation.findById(id).
        populate('allies').
        populate('enemies').
        exec();

    return doc;
};

const getNationTerritories = async (id) => {
    const doc = await Nation.findById(id).
        populate('territories').
        exec();
    
    return doc.territories;
};

const getNationWars = async (id, alignment) => {
    let doc;
    let nationDoc;
    switch (alignment) {
        case 'all':
            nationDoc = await Nation.findById(id).
                populate('aggressiveWars').
                populate('defensiveWars').
                exec();
            
            doc = nationDoc.aggressiveWars.concat(nationDoc.defensiveWars);
            break;
        
        case 'aggressor':
            nationDoc = await Nation.findById(id).
                populate('aggressiveWars').
                exec();

            doc = nationDoc.aggressiveWars;
            break;

        case 'defender':
            nationDoc = await Nation.findById(id).
                populate('defensiveWars').
                exec();

            doc = nationDoc.defensiveWars;
            break;
        
        default:
            return new Error('Invalid Alignment');
    }

    return doc;
};

const newNation = async ({ name, code}) => {
    const doc = new Nation({
        name,
        code,
        score: 0
    });
    const savedDoc = await doc.save();

    return savedDoc;
};

const updateNation = async (id, field, body) => {
    const doc = await Nation.findById(id).exec();

    if (field === 'allies' || field === 'enemies') {
        // Get the other nation's document
        let otherDoc;
        if (body.value.length === 3) {
            otherDoc = await Nation.findOne({ code: body.value }).exec();
        } else {
            otherDoc = await Nation.findById(body.value).exec();
        }

        if (body.action === 'add') {
            // Add ally/enemy to both nations
            //if (doc[field].find(body.value)) { return new Error(`${field} ${body.value} already exists. Did you mean to use the 'remove' action?`) }

            doc[field].push(body.value);
            otherDoc[field].push(id);
        } else if (body.action === 'remove') {
            // Remove ally/enemy from both nations
            const index = doc[field].indexOf(body.value);
            const otherIndex = otherDoc[field].indexOf(id);

            doc[field].splice(index, 1);
            otherDoc[field].splice(otherIndex, 1);
        } else {
            return new Error('Invalid action');
        }

        await doc.save();
        await otherDoc.save();
    } else {
        doc[field] = body.value;
        await doc.save();
    }
    
    return doc;
};

export default { getNation, newNation, getNations, updateNation, getNationTerritories, getNationWars };