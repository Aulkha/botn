import mongoose from "mongoose";
const { Schema } = mongoose;


const battleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    index: Number,
    territory: {
        type: Schema.Types.ObjectId,
        ref: 'Territory',
        required: true
    },
    belligerents: {
        aggressors: [{
            type: Schema.Types.ObjectId,
            ref: 'Nation',
            required: true
        }],
        defenders: [{
            type: Schema.Types.ObjectId,
            ref: 'Nation',
            required: true
        }]
    },
    ongoing: Boolean
}, { timestamps: true });

const warSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    belligerents: {
        aggressors: [{
            type: Schema.Types.ObjectId,
            ref: 'Nation',
            required: true
        }],
        defenders: [{
            type: Schema.Types.ObjectId,
            ref: 'Nation',
            required: true
        }]
    },
    ongoing: Boolean,
    battles: [{
        type: Schema.Types.ObjectId,
        ref: 'Battle'
    }]
}, { timestamps: true });


const War = mongoose.model('War', warSchema)
const Battle = mongoose.model('Battle', battleSchema)

export { War, Battle };